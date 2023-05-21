// import MESSAGE_HI from "../constants";
const MESSAGE_HI_CONTENT = "hi content";

console.log("content script is invoked !!!!!!!!!!!!!!!!!!");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("content script got request !!!!!!!!!!");
  console.log(request);
  console.log(sender);
  const { payload, action } = request;
  if (action === MESSAGE_HI_CONTENT) {
    console.log(payload);
    console.log("before sendResponse in content script");
    sendResponse({ message: "hi to you from content scripts" });
  }
});
