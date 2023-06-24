chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
  const activeElement = document.activeElement;

  if (request.action === "extract_textbox" && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA" || activeElement.hasAttribute("contenteditable"))) {
    var text = activeElement.value || activeElement.innerText;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sentence: text }),
    };
    const response = await fetch("http://127.0.0.1:8000/corrector", requestOptions);
    const corrected_text = await response.json();
    activeElement.value ? activeElement.value = corrected_text.corrected_sentence : activeElement.innerText = corrected_text.corrected_sentence;
    sendResponse({ data: corrected_text });
  }

  if (request.action === "predict_word" && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA" || activeElement.hasAttribute("contenteditable"))) {
    var text = activeElement.value || activeElement.innerText;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sentence: text }),
    };
    const response = await fetch("http://127.0.0.1:8000/predict", requestOptions);
    const next_word = await response.json();
    activeElement.value ? activeElement.value += " " + next_word.predicted_word : activeElement.innerText += " " + next_word.predicted_word;
    sendResponse({ data: next_word });
  }
  
  return true;
});
