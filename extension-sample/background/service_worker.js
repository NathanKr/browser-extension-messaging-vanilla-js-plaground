console.log('service worker is invoked on the background');

const MESSAGE_HI_BACKGROUND = "hi background";


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('background service worker got request !!!!!!!!!!');
     console.log(request);
     console.log(sender);
     if (request.message === MESSAGE_HI_BACKGROUND)
       console.log('before sendResponse in background service worker');
       sendResponse({ message: "hi to you from background service worker" });
   });
   