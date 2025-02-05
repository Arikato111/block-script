export default defineBackground(() => {
  blockScript();
  BlockScriptUrl();
});

// This function will block any script requests by checking URLs that contain '.js'.
function BlockScriptUrl() {
  browser.webRequest.onBeforeRequest.addListener(
    (details) => {
      const url = details.url;
      if (url.endsWith(".js") || url.includes(".js")) {
        return { cancel: true };
      }
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
  );
}

/// This function will add 'Content-Security-Policy' to Response header
/// to tell browser to block script and fonts
function blockScript() {
  browser.webRequest.onHeadersReceived.addListener(
    function (details) {
      const responseHeaders = details.responseHeaders;
      responseHeaders?.push({
        name: "Content-Security-Policy",
        // this is where to check which is blocked.
        value:
          "script-src-elem 'none'; script-src 'none'; object-src 'none'; font-src 'none'",
      });
      return {
        responseHeaders,
      };
    },
    {
      urls: ["<all_urls>"],
    },
    ["blocking", "responseHeaders"]
  );
}
