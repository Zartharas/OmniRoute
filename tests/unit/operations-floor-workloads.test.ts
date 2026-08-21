import assert from "node:assert/strict";
import test from "node:test";

const {
  deriveOperationsWorkloadHealth,
  normalizeOperationsProtectedNativePolicy,
  normalizeOperationsWorkloadPolicy,
} = await import(
  "../../src/app/(dashboard)/dashboard/operations-floor/operationsFloorWorkloads.ts"
);

test(
  "protected native ChatGPT remains outside routed workloads",
  () => {
    const policy = {
      version: 1,
      models: [
        {
          alias: "personal/glm-5.2",
          display_name: "Personal • GLM 5.2",
          model: "nvidia/z-ai/glm-5.2",
          credential: "personal",
          priority: 1,
        },
        {
          alias: "mta/gpt-5.6-terra-dzus",
          display_name: "MTA • GPT-5.6 Terra",
          model: "ibm-se-mta/gpt-5.6-terra-dzus",
          credential: "mta",
          priority: 2,
        },
      ],
      protected_native_chatgpt: [
        {
          key: "sol",
          display_name: "GPT-5.6 Sol",
          status: "protected-native",
        },
        {
          key: "terra",
          display_name: "GPT-5.6 Terra",
          status: "protected-native",
        },
        {
          key: "luna",
          display_name: "GPT-5.6 Luna",
          status: "protected-native",
        },
      ],
    };

    const routed =
      normalizeOperationsWorkloadPolicy(policy);

    const native =
      normalizeOperationsProtectedNativePolicy(
        policy
      );

    assert.equal(routed.length, 2);
    assert.equal(native.length, 3);

    assert.deepEqual(
      native.map(
        (entry: { key: string }) =>
          entry.key
      ),
      [
        "sol",
        "terra",
        "luna",
      ]
    );
  }
);

test(
  "MTA workload remains isolated",
  () => {
    const [workload] =
      normalizeOperationsWorkloadPolicy({
        models: [
          {
            alias:
              "mta/gpt-5.6-terra-dzus",
            display_name:
              "MTA • GPT-5.6 Terra",
            model:
              "ibm-se-mta/gpt-5.6-terra-dzus",
            credential: "mta",
            priority: 1,
          },
        ],
      });

    assert.ok(workload);

    assert.equal(
      deriveOperationsWorkloadHealth(
        workload,
        [
          {
            id: "ibm-se-mta",
            connected: 1,
            errors: 0,
          },
        ]
      ),
      "isolated"
    );
  }
);

test(
  "invalid protected native entries are ignored",
  () => {
    const native =
      normalizeOperationsProtectedNativePolicy({
        protected_native_chatgpt: [
          {
            key: "sol",
            display_name: "GPT-5.6 Sol",
            status: "protected-native",
          },
          {
            key: "bad",
            display_name: "Bad",
            status: "routeable",
          },
          {
            display_name: "Missing key",
            status: "protected-native",
          },
        ],
      });

    assert.equal(native.length, 1);
    assert.equal(native[0]?.key, "sol");
  }
);
