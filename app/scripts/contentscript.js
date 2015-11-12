'use strict';

var myFrame = document.createElement('iframe');
myFrame.setAttribute('sandbox', 'allow-same-origin allow-scripts');
myFrame.setAttribute('class', 'extension-inlay');
myFrame.setAttribute('style', 'width: 600px; height: 400px');
myFrame.src = chrome.extension.getURL('scripts/features/test.html');
var container = document.createElement('div');
container.appendChild(myFrame);

document.body.insertBefore(container, document.body.firstChild);
