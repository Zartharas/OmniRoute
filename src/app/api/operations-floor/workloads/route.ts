import { readFile } from "node:fs/promises";

import {
  normalizeOperationsProtectedNativePolicy,
  normalizeOperationsWorkloadPolicy,
} from "@/app/(dashboard)/dashboard/operations-floor/operationsFloorWorkloads";

export const dynamic = "force-dynamic";

const NO_STORE = {
  "Cache-Control": "no-store",
};

function workloadPolicyPath(): string {
  const configured =
    process.env.OMNIROUTE_UNIFIED_WORKLOAD_POLICY_PATH?.trim();

  if (!configured) {
    throw new Error(
      "OMNIROUTE_UNIFIED_WORKLOAD_POLICY_PATH is not configured."
    );
  }

  return configured;
}

export async function GET() {
  try {
    const raw = await readFile(
      /* turbopackIgnore: true */
      workloadPolicyPath(),
      "utf8"
    );

    const policy = JSON.parse(raw);

    const models =
      normalizeOperationsWorkloadPolicy(
        policy
      );

    const protectedNative =
      normalizeOperationsProtectedNativePolicy(
        policy
      );

    if (models.length === 0) {
      return Response.json(
        {
          models: [],
          error: "Unified workload policy is empty.",
        },
        {
          status: 503,
          headers: NO_STORE,
        }
      );
    }

    return Response.json(
      {
        models,
        protectedNative,
        source: "unified-workload-policy",
      },
      {
        headers: NO_STORE,
      }
    );
  } catch {
    return Response.json(
      {
        models: [],
        error: "Unified workload policy is unavailable.",
      },
      {
        status: 503,
        headers: NO_STORE,
      }
    );
  }
}
