const DEFAULT_KIMI_WEB_BASE_URL = "https://www.kimi.ai";
const KIMI_WEB_CHAT_PATH = "/apiv2/kimi.gateway.chat.v1.ChatService/Chat";

function normalizeBaseUrl(value: string): string {
  const raw = value.trim() || DEFAULT_KIMI_WEB_BASE_URL;
  const parsed = new URL(raw);

  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    throw new Error("KIMI_WEB_BASE_URL must use http or https");
  }

  return parsed.origin;
}

export function getKimiWebBaseUrl(): string {
  return normalizeBaseUrl(process.env.KIMI_WEB_BASE_URL?.trim() || DEFAULT_KIMI_WEB_BASE_URL);
}

export function getKimiWebChatUrl(): string {
  const configured = process.env.KIMI_WEB_CHAT_URL?.trim();

  return configured || `${getKimiWebBaseUrl()}${KIMI_WEB_CHAT_PATH}`;
}

export function getKimiWebUserUrl(): string {
  return `${getKimiWebBaseUrl()}/api/user`;
}

export function getKimiWebCookieDomain(): string {
  const hostname = new URL(getKimiWebBaseUrl()).hostname.toLowerCase();

  if (hostname.startsWith("www.")) {
    return `.${hostname.slice(4)}`;
  }

  return hostname.startsWith(".") ? hostname : `.${hostname}`;
}
