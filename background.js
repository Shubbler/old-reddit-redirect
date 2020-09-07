const oldReddit = "https://old.reddit.com";
const excludedPaths = [
  "/gallery",
  "/poll",
  "/rpan",
  "/settings",
  "/topics"];

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    const url = new URL(details.url);
    
    // If already requesting old reddit, continue
    if (url.hostname === "old.reddit.com") return;
    
    // If user is attempting to access a redesign view, continue
    for (const path of excludedPaths) {
      if (url.pathname.indexOf(path) === 0) return;
    }
    
    // Finally return a URL redirecting user back to old Reddit
    return {redirectUrl: oldReddit + url.pathname + url.search + url.hash};
  },
  {
    urls: [
      "*://reddit.com/*",
      "*://www.reddit.com/*",
      "*://np.reddit.com/*",
      "*://new.reddit.com/*",
      "*://amp.reddit.com/*",
    ],
    types: [
      "main_frame",
      "sub_frame",
      "stylesheet",
      "script",
      "image",
      "object",
      "xmlhttprequest",
      "other"
    ]
  },
  ["blocking"]
);
