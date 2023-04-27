// import MESSAGE_HI from "../constants";
const MESSAGE_HI = 'hi';


console.log("content script is invoked !!!!!!!!!!!!!!!!!!");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
 console.log('content script got request !!!!!!!!!!');
  console.log(request);
  console.log(sender);
  if (request.message === MESSAGE_HI)
    console.log('before sendResponse in content script');
    sendResponse({ message: "hi to you from content scripts" });
});
