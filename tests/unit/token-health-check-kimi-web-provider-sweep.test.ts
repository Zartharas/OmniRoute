import {
  describe,
  it
} from "node:test";

import assert from "node:assert/strict";

import {
  loadHealthCheckSweepConnections
} from "../../src/lib/tokenHealthCheck.ts";

describe(
  "Kimi Web exact-provider token-health reachability",
  () => {
    it(
      "preserves OAuth rows and adds only provider=kimi-web without sweeping Moonshot or Kimi Code API-key rows",
      async () => {
        const calls:
          Array<Record<string, unknown>> =
          [];

        const loader =
          async (
            filter:
              Record<string, unknown>
          ) => {
            calls.push(filter);

            if (
              filter.authType ===
              "oauth"
            ) {
              return [
                {
                  id: "kimi-coding-oauth-1",
                  provider: "kimi-coding"
                },
                {
                  id: "oauth-1",
                  provider: "openai"
                }
              ];
            }

            if (
              filter.provider ===
              "kimi-web"
            ) {
              return [
                {
                  id: "kimi-web-1",
                  provider: "kimi-web",
                  authType: "apikey"
                }
              ];
            }

            throw new Error(
              `unexpected sweep filter: ${JSON.stringify(filter)}`
            );
          };

        const result =
          await loadHealthCheckSweepConnections(
            loader as never
          );

        assert.deepEqual(
          calls,
          [
            {
              authType: "oauth"
            },
            {
              provider: "kimi-web"
            }
          ]
        );

        assert.deepEqual(
          result.map(
            (row: any) =>
              row.id
          ),
          [
            "kimi-coding-oauth-1",
            "oauth-1",
            "kimi-web-1"
          ]
        );

        assert.equal(
          calls.some(
            (filter) =>
              filter.authType ===
              "apikey"
          ),
          false
        );

        assert.equal(
          calls.some(
            (filter) =>
              filter.provider ===
              "moonshot" ||
              filter.provider ===
              "kimi-coding-apikey"
          ),
          false
        );

        assert.equal(
          result.some(
            (row: any) =>
              row.provider ===
              "moonshot" ||
              row.provider ===
              "kimi-coding-apikey"
          ),
          false
        );
      }
    );
  }
);
