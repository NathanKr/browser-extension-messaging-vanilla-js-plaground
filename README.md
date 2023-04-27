<h2>Motivation</h2>
Experiment with <a href='https://developer.chrome.com/docs/extensions/mv2/messaging/#simple'>simple one time request</a> from popup to content script


<h2>Instll the extension on chrome</h2>
<ol>
<li>navigate to More tools->Extensions->Turn on developer mode->Load unpacked->select the folder of your extension. Now the extetion is installed</li>
<li>pin the extension via Chrome->Extensions</li>
</ol>


<h2>API</h2>
<h3><a href='https://developer.chrome.com/docs/extensions/reference/tabs/#method-sendMessage'>send message from popup to content script</a></h3>

```javascript

chrome.tabs.sendMessage(
  tabId: number,
  message: any,
  options?: object,
  callback?: function,
) 


```

The callback parameter looks like:

```javascript

 (response: any) => void 

```

<h3><a href='https://developer.chrome.com/docs/extensions/reference/runtime/#event-onMessage'>recive message</a></h3>

```javascript
chrome.runtime.onMessage.addListener(
  callback: function,
)
```

return boolean or undefined

The callback parameter looks like:

```javascript

(message: any, sender: MessageSender, sendResponse: function) => boolean | undefined 

```