chrome.commands.onCommand.addListener(function (command) {
  if (command === "extract_text") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "extract_textbox" });
    });
  }
});

// Additional code in the background script to handle received messages
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "extract_textbox") {
    // Message handling after receiving the request
    // ...
    // Send an empty response to acknowledge the request
    sendResponse({});
  }
});

chrome.commands.onCommand.addListener(function (command) {
  if (command === "predict_word") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "predict_word" });
    });
  }
});

// Additional code in the background script to handle received messages
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "predict_word") {
    // Message handling after receiving the request
    // ...
    // Send an empty response to acknowledge the request
    sendResponse({});
  }
});
