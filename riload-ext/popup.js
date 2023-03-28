console.warn('popup')
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  var tab = tabs[0];
  var enabled = false;
  console.warn(JSON.stringify(tab, null, 2))
  console.warn("Tab.id", tab.id)
  chrome.runtime.sendMessage(null, { type: "checkEnabled" }, {}, function (response) {
    if (response !== undefined) {
      console.warn("Response:", JSON.stringify(response))
      enabled = response.enabled;
      updateButton();
    } else {
      console.warn("response is undefined")
    }
  });

  document.getElementById("toggle").addEventListener("click", function () {
    enabled = !enabled;
    console.warn("enabled:", enabled)
    chrome.runtime.sendMessage({ type: "setEnabled", enabled: enabled });
    updateButton();
  });

  function updateButton() {
    var button = document.getElementById("toggle");
    if (enabled) {
      button.textContent = "Disable";
    } else {
      button.textContent = "Enable";
    }
  }
});
