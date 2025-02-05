import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: "chrome",
  // manifestVersion: 2,
  manifest: {
    name: "block script",
    description:
      "the extensions to block any scripts on any website with simple code and easy to check source",

    permissions: [
      "webRequest",
      "webRequestBlocking",

      // "tabs",
      // "webNavigation",
      // "activeTab",
      // "storage",
    ],
    browser_specific_settings: {
      gecko: {
        id: "block-script@Arikato111",
      },
    },
    host_permissions: ["http://*/*", "https://*/*"],
  },
});
