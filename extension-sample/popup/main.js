// import './style.css'

const MESSAGE_HI_CONTENT = "hi content";
const MESSAGE_HI_BACKGROUND = "hi background";
const CONTENT_SCRIPT_TAB_URL = "https://www.ynet.co.il";
const BUTTON_SEND_MESSAGE_TO_CONTENT_SCRIPT_ID = "id1";
const BUTTON_SEND_MESSAGE_TO_BACKGROUND_ID = "id1dot5";
const BUTTON_CREATE_TAB_ID = "id2";
const BUTTON_GET_ACTIVE_TAB_ID = "id3";
const ACTIVE_TAB_ID_ID = "id4";
const MESSAGES_FROM_CONTENT_SCRIPT_ID = "id5";
const MESSAGES_FROM_BACKGROUND_ID = "id5.5";

let tabId = null;

document.querySelector("#app").innerHTML = `
  <div>
    <h1 style='color:blue'>Communication POC !!!</h1>
    <div>
      <p>content script url : ${CONTENT_SCRIPT_TAB_URL} - <span style='color:red'>make sure it is active and click 'get active tab id'</span></p>
      <button id='${BUTTON_SEND_MESSAGE_TO_CONTENT_SCRIPT_ID}'>send message to content script </button>
      <button id='${BUTTON_SEND_MESSAGE_TO_BACKGROUND_ID}'>send message to background</button>
      <button id='${BUTTON_CREATE_TAB_ID}'>create ynet tab</button>
      <button id='${BUTTON_GET_ACTIVE_TAB_ID}'>get active tab id</button>
      <br/>
      <label>Active tab id : </label><span id=${ACTIVE_TAB_ID_ID}>${tabId}</span>
      <h3>Message from content script</h3>
      <div id='${MESSAGES_FROM_CONTENT_SCRIPT_ID}'></div>
      <h3>Message from background</h3>
      <div id='${MESSAGES_FROM_BACKGROUND_ID}'></div>
    </div>
  </div>
`;

function sendMessageToContentScript() {
  console.log(`message : ${MESSAGE_HI_CONTENT}`);
  // --- use tabs for content
  chrome.tabs.sendMessage(tabId, MESSAGE_HI_CONTENT, null, (response) => {
    console.log(response?.message);
    document.getElementById(
      MESSAGES_FROM_CONTENT_SCRIPT_ID
    ).innerHTML += `<p>${response?.message}</p>`;
    console.log(`got response from content sript : ${response?.message}`);
  });
}

function sendMessageToBackground(){
  const extensionId = null;
  console.log(`message : ${MESSAGE_HI_BACKGROUND}`);
  // --- use runtime for non content
  chrome.runtime.sendMessage(extensionId, MESSAGE_HI_BACKGROUND, null, (response) => {
    console.log(response?.message);
    document.getElementById(
      MESSAGES_FROM_BACKGROUND_ID
    ).innerHTML += `<p>${response?.message}</p>`;
    console.log(`got response from background : ${response?.message}`);
  });
}

async function createTab() {
  const newActiveTab = await chrome.tabs.create({
    url: CONTENT_SCRIPT_TAB_URL,
    active: true,
  });

  // tabId = newActiveTab.id; remarked because popup close after the tab is created
  console.log(newActiveTab);
}

function getActiveTabId() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];
    tabId = activeTab.id;
    document.getElementById(ACTIVE_TAB_ID_ID).innerText = tabId;
  });
}

document
  .querySelector(`#${BUTTON_SEND_MESSAGE_TO_CONTENT_SCRIPT_ID}`)
  .addEventListener("click", sendMessageToContentScript);
document
  .querySelector(`#${BUTTON_SEND_MESSAGE_TO_BACKGROUND_ID}`)
  .addEventListener("click", sendMessageToBackground);
document
  .querySelector(`#${BUTTON_CREATE_TAB_ID}`)
  .addEventListener("click", createTab);
document
  .querySelector(`#${BUTTON_GET_ACTIVE_TAB_ID}`)
  .addEventListener("click", getActiveTabId);
