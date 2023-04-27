// import './style.css'

const MESSAGE_HI = "hi";
const BUTTON_SEND_MESSAGE_ID = "id1";
const BUTTON_CREATE_TAB_ID = "id2";
const BUTTON_GET_ACTIVE_TAB_ID = "id3";
const CONTENT_SCRIPT_TAB_URL = "https://www.ynet.co.il";
const ACTIVE_TAB_ID_ID = "id4";
const MESSAGES_FROM_CONTENT_SCRIPT_ID = "id5";

let tabId = null;

document.querySelector("#app").innerHTML = `
  <div>
    <h1 style='color:blue'>Communication POC !!!</h1>
    <div>
      <p>content script url : ${CONTENT_SCRIPT_TAB_URL} - <span style='color:red'>make sure it is active</span></p>
      <button id='${BUTTON_SEND_MESSAGE_ID}'>send message to content script </button>
      <button id='${BUTTON_CREATE_TAB_ID}'>create tab</button>
      <button id='${BUTTON_GET_ACTIVE_TAB_ID}'>get active tab id</button>
      <br/>
      <label>Active tab id : </label><span id=${ACTIVE_TAB_ID_ID}>${tabId}</span>
      <h3>Message from content script</h3>
      <div id='${MESSAGES_FROM_CONTENT_SCRIPT_ID}'></div>
    </div>
  </div>
`;

function clickHandlerSendMessageToContextScript() {
  console.log(`message : ${MESSAGE_HI}`);
  chrome.tabs.sendMessage(tabId, MESSAGE_HI, null, (response) => {
    console.log(response?.message);
    document.getElementById(
      MESSAGES_FROM_CONTENT_SCRIPT_ID
    ).innerHTML += `<p>${response?.message}</p>`;
    console.log(`got response from content sript : ${response?.message}`);
  });
}

async function clickHandlerCreateTab() {
  const newActiveTab = await chrome.tabs.create({
    url: CONTENT_SCRIPT_TAB_URL,
    active: true,
  });

  // tabId = newActiveTab.id; remarked because popup close after the tab is created
  console.log(newActiveTab);
}

function clickHandlerGetActiveTabId() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];
    tabId = activeTab.id;
    document.getElementById(ACTIVE_TAB_ID_ID).innerText = tabId;
  });
}

document
  .querySelector(`#${BUTTON_SEND_MESSAGE_ID}`)
  .addEventListener("click", clickHandlerSendMessageToContextScript);
document
  .querySelector(`#${BUTTON_CREATE_TAB_ID}`)
  .addEventListener("click", clickHandlerCreateTab);
document
  .querySelector(`#${BUTTON_GET_ACTIVE_TAB_ID}`)
  .addEventListener("click", clickHandlerGetActiveTabId);
