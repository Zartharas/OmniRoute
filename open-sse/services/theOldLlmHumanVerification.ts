const THEOLDLLM_ORIGIN = "https://theoldllm.vercel.app";
const THEOLDLLM_API_PATH = "/api/chatgpt";
const DEFAULT_TTL_MS = 10 * 60 * 1000;

type TimerHandle = ReturnType<typeof setTimeout>;

interface PageLike {
  goto(
    url: string,
    options?: { waitUntil?: "domcontentloaded"; timeout?: number }
  ): Promise<unknown>;
  evaluate(
    fn: (arg: {
      path: string;
      body: Record<string, unknown>;
      clientVersion: string;
    }) => Promise<TheOldLlmBrowserResult>,
    arg: {
      path: string;
      body: Record<string, unknown>;
      clientVersion: string;
    }
  ): Promise<TheOldLlmBrowserResult>;
  isClosed?: () => boolean;
}

interface ContextLike {
  newPage(): Promise<PageLike>;
  close(): Promise<void>;
}

interface BrowserLike {
  newContext(options: {
    viewport: { width: number; height: number };
    locale: string;
  }): Promise<ContextLike>;
  close(): Promise<void>;
}

export interface TheOldLlmBrowserResult {
  status: number;
  contentType: string | null;
  body: string;
}

export interface TheOldLlmHumanVerificationStatus {
  active: boolean;
  phase: "idle" | "waiting" | "verified";
  origin: string;
  startedAt: number | null;
  expiresAt: number | null;
}

export interface TheOldLlmHumanVerificationDependencies {
  now: () => number;
  setTimer: (fn: () => void, ms: number) => TimerHandle;
  clearTimer: (timer: TimerHandle) => void;
  launchBrowser: (options: {
    headless: false;
    args: string[];
  }) => Promise<BrowserLike>;
}

interface ActiveSession {
  browser: BrowserLike;
  context: ContextLike;
  page: PageLike;
  startedAt: number;
  expiresAt: number;
  phase: "waiting" | "verified";
}

export interface TheOldLlmHumanVerificationCoordinator {
  start(): Promise<TheOldLlmHumanVerificationStatus>;
  stop(reason?: string): Promise<void>;
  status(): TheOldLlmHumanVerificationStatus;
  execute(
    body: Record<string, unknown>,
    signal?: AbortSignal | null
  ): Promise<TheOldLlmBrowserResult | null>;
}

function defaultDependencies(): TheOldLlmHumanVerificationDependencies {
  return {
    now: () => Date.now(),
    setTimer: (fn, ms) => setTimeout(fn, ms),
    clearTimer: (timer) => clearTimeout(timer),
    launchBrowser: async (options) => {
      const { chromium } = await import("playwright");
      return (await chromium.launch(options)) as unknown as BrowserLike;
    },
  };
}

export function createTheOldLlmHumanVerificationCoordinator(
  overrides?: Partial<TheOldLlmHumanVerificationDependencies>
): TheOldLlmHumanVerificationCoordinator {
  const defaults = defaultDependencies();
  const deps: TheOldLlmHumanVerificationDependencies = {
    ...defaults,
    ...overrides,
  };

  let active: ActiveSession | null = null;
  let starting: Promise<TheOldLlmHumanVerificationStatus> | null = null;
  let expiryTimer: TimerHandle | null = null;

  const publicStatus = (): TheOldLlmHumanVerificationStatus => ({
    active: active !== null && deps.now() < active.expiresAt,
    phase:
      active !== null && deps.now() < active.expiresAt
        ? active.phase
        : "idle",
    origin: THEOLDLLM_ORIGIN,
    startedAt: active?.startedAt ?? null,
    expiresAt: active?.expiresAt ?? null,
  });

  const clearExpiryTimer = () => {
    if (!expiryTimer) return;
    deps.clearTimer(expiryTimer);
    expiryTimer = null;
  };

  const closeSession = async () => {
    const current = active;
    active = null;
    clearExpiryTimer();
    if (!current) return;

    try {
      await current.context.close();
    } catch {}

    try {
      await current.browser.close();
    } catch {}
  };

  const stop = async (_reason = "user-request") => {
    await closeSession();
  };

  const expireIfNeeded = async () => {
    if (!active) return;
    if (deps.now() < active.expiresAt) return;
    await closeSession();
  };

  const start = async (): Promise<TheOldLlmHumanVerificationStatus> => {
    await expireIfNeeded();
    if (active) return publicStatus();
    if (starting) return starting;

    starting = (async () => {
      const browser = await deps.launchBrowser({
        headless: false,
        args: [
          "--no-sandbox",
          "--disable-dev-shm-usage",
          "--disable-blink-features=AutomationControlled",
        ],
      });

      let context: ContextLike | null = null;
      try {
        context = await browser.newContext({
          viewport: { width: 1280, height: 800 },
          locale: "en-US",
        });
        const page = await context.newPage();
        await page.goto(THEOLDLLM_ORIGIN, {
          waitUntil: "domcontentloaded",
          timeout: 60_000,
        });

        const startedAt = deps.now();
        active = {
          browser,
          context,
          page,
          startedAt,
          expiresAt: startedAt + DEFAULT_TTL_MS,
          phase: "waiting",
        };

        expiryTimer = deps.setTimer(() => {
          void closeSession();
        }, DEFAULT_TTL_MS);
        expiryTimer.unref?.();

        return publicStatus();
      } catch (error) {
        try {
          await context?.close();
        } catch {}
        try {
          await browser.close();
        } catch {}
        throw error;
      }
    })();

    try {
      return await starting;
    } finally {
      starting = null;
    }
  };

  const execute = async (
    body: Record<string, unknown>,
    signal?: AbortSignal | null
  ): Promise<TheOldLlmBrowserResult | null> => {
    await expireIfNeeded();
    const current = active;
    if (!current) return null;
    if (signal?.aborted) return null;
    if (current.page.isClosed?.()) {
      await closeSession();
      return null;
    }

    try {
      const result = await current.page.evaluate(
        async ({ path, body: requestBody, clientVersion }) => {
          const response = await fetch(path, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Client-Version": clientVersion,
            },
            credentials: "include",
            cache: "no-store",
            body: JSON.stringify(requestBody),
          });

          return {
            status: response.status,
            contentType: response.headers.get("content-type"),
            body: await response.text(),
          };
        },
        {
          path: THEOLDLLM_API_PATH,
          body,
          clientVersion: "3.8.4",
        }
      );

      if (result.status === 200) {
        current.phase = "verified";
      }
      return result;
    } catch {
      await closeSession();
      return null;
    }
  };

  return { start, stop, status: publicStatus, execute };
}

const singleton = createTheOldLlmHumanVerificationCoordinator();

let fetchOverride:
  | ((body: Record<string, unknown>) => Promise<TheOldLlmBrowserResult | null>)
  | null = null;

export function __setTheOldLlmHumanVerificationFetchOverrideForTesting(
  override:
    | ((body: Record<string, unknown>) => Promise<TheOldLlmBrowserResult | null>)
    | null
): void {
  fetchOverride = override;
}

export function __resetTheOldLlmHumanVerificationFetchOverrideForTesting(): void {
  fetchOverride = null;
}

export function getTheOldLlmHumanVerificationStatus(): TheOldLlmHumanVerificationStatus {
  return singleton.status();
}

export async function startTheOldLlmHumanVerification(): Promise<TheOldLlmHumanVerificationStatus> {
  return singleton.start();
}

export async function stopTheOldLlmHumanVerification(reason = "user-request"): Promise<void> {
  return singleton.stop(reason);
}

export function hasActiveTheOldLlmHumanVerificationSession(): boolean {
  return fetchOverride !== null || singleton.status().active;
}

export async function fetchTheOldLlmWithActiveHumanVerification(
  body: Record<string, unknown>,
  signal?: AbortSignal | null
): Promise<TheOldLlmBrowserResult | null> {
  if (fetchOverride) return fetchOverride(body);
  return singleton.execute(body, signal);
}
