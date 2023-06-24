document.addEventListener("DOMContentLoaded", function() {
  var spellCheckCheckbox = document.getElementById("spellCheckCheckbox");
  var resultDiv = document.getElementById("result");
  var nwpCheckbox = document.getElementById("nwpCheckbox");
  var resultDiv2 = document.getElementById("result2");

  function saveButtonState() {
    chrome.storage.local.set({
      spellCheckCheckbox: spellCheckCheckbox.checked,
      nwpCheckbox: nwpCheckbox.checked
    });
  }

  function loadButtonState() {
    chrome.storage.local.get(["spellCheckCheckbox", "nwpCheckbox"], function(result) {
      if (result.spellCheckCheckbox !== undefined) {
        spellCheckCheckbox.checked = result.spellCheckCheckbox;
      }
      if (result.nwpCheckbox !== undefined) {
        nwpCheckbox.checked = result.nwpCheckbox;
      }
    });
  }

  loadButtonState();

  spellCheckCheckbox.addEventListener("change", function(event) {
    toggleButtonColor(event);
    saveButtonState();
  });
  nwpCheckbox.addEventListener("change", function(event) {
    toggleButtonColor(event);
    saveButtonState();
  });

  document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.key === "q") {
      event.preventDefault();
      extractText(event);
    }

    if (event.ctrlKey && event.key === "b") {
      event.preventDefault();
      predictNextWord(event);
    }
  });

  async function fetchData(url, requestOptions) {
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data;
  }

  function toggleButtonColor(event) {
    const checkbox = event.target;
    if (checkbox.id === "spellCheckCheckbox" && checkbox.checked) {
      extractText(event);
    } else if (checkbox.id === "nwpCheckbox" && checkbox.checked) {
      predictNextWord(event);
    }
  }

  async function extractText(event) {
    if (!spellCheckCheckbox.checked) return;

    chrome.tabs.query({ active: true, currentWindow: true }, async function(tabs) {
      chrome.runtime.sendMessage({ action: "extract_textbox" }, function(response) {
        // handle the response
      });
    });
  }

  async function predictNextWord(event) {
    if (!nwpCheckbox.checked) return;

    chrome.tabs.query({ active: true, currentWindow: true }, async function(tabs) {
      chrome.runtime.sendMessage({ action: "predict_word" }, function(response) {
        // handle the response
      });
    });
  }
});
