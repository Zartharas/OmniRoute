import test from "node:test";
import assert from "node:assert/strict";

import { HIDEABLE_SIDEBAR_ITEM_IDS } from "../../src/shared/constants/sidebarVisibility/types.ts";
import { SIDEBAR_SECTIONS } from "../../src/shared/constants/sidebarVisibility/sections.ts";

test("Operations Floor is registered as a dashboard tool", () => {
  const omniProxy = SIDEBAR_SECTIONS.find((section) => section.id === "omni-proxy");
  assert.ok(omniProxy);

  const tools = omniProxy.children.find(
    (child) => "type" in child && child.type === "group" && child.id === "tools"
  );

  assert.ok(tools);
  assert.ok("type" in tools && tools.type === "group");

  const operationsFloor = tools.items.find((item) => item.id === "operations-floor");

  assert.ok(operationsFloor);
  assert.equal(operationsFloor.href, "/dashboard/operations-floor");
  assert.equal(operationsFloor.labelFallback, "Operations Floor");
  assert.equal(operationsFloor.subtitleFallback, "Live routing and protected OpenAI fallback");
  assert.equal(operationsFloor.icon, "hub");

  assert.ok(HIDEABLE_SIDEBAR_ITEM_IDS.includes("operations-floor"));
});
