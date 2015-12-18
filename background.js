
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(request,sender)
      if(request.action=='capture'){
          openTab();
          capture();
      }
    }
);

function openTab(){
  chrome.tabs.query({url:'chrome-extension://*/process.html'},function(tabs){
    console.log(tabs);
    if(tabs.length==0){
      chrome.tabs.create({url: 'process.html'});
    }
  })
}

function capture(){
  chrome.tabs.executeScript({file:"content.js"},function(win){});
}