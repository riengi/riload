var enabled = false;
var intervalId = undefined;
var tabId = undefined;

console.warn("Background")
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.warn('On message')
  console.warn('Message received')
  console.warn('Request:', JSON.stringify(request))
  console.warn('Sender:', JSON.stringify(sender))
  console.warn('sendResponse:', JSON.stringify(sendResponse))
  if (request.type === "checkEnabled") {
    console.warn("checkEnabled received")
    sendResponse({ enabled: enabled });
  } else if (request.type === "setEnabled") {
    console.warn("setEnabled received")
    console.warn("enabled:", request.enabled)
    enabled = request.enabled;

    if (enabled === true) {

      if (tabId === undefined) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

          tabId = tabs[0].id;
          console.warn("tabId:", tabId)
        });
      }

      if (intervalId === undefined) {
        intervalId = setInterval(function () {
          console.warn('create interval')

          if (tabId !== undefined) {
            console.warn("Reloaded")
            chrome.tabs.reload(tabId)
          }
        }, 10000)
      }
    }

    if (enabled === false) {
      if (intervalId !== undefined) {
        console.warn('clear interval')
        clearInterval(intervalId)
        intervalId = undefined;

        tabId = undefined;
        console.warn("tabId:", tabId)
      }
    }
  }
});


