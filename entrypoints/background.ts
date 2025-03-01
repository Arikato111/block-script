// create type for BlackList
type ResourceType = chrome.webRequest.ResourceType;
// blocking by check details.type
const BlackList: ResourceType[] = ["script", "font", "object"];

export default defineBackground(() => {
  chrome.webRequest.onHeadersReceived.addListener(
    function (details) {
      const responseHeaders = details.responseHeaders ?? [];
      responseHeaders.push({
        name: "Content-Security-Policy",
        // this is where to check which is blocked.
        value:
          "script-src-elem 'none'; script-src 'none'; object-src 'none'; font-src 'none'; media-src 'none';",
      });

      if (BlackList.includes(details.type)) {
        responseHeaders.push({
          name: "Cache-Control",
          value: "must-understand, no-store,  must-revalidate",
        });
        return { cancel: true, responseHeaders };
      }

      return { responseHeaders };
    },
    { urls: ["<all_urls>"] },
    ["blocking", "responseHeaders"]
  );
});
