(function (angular) {
'use strict';
  angular.module('backgroundApp', [])
  .constant('API_KEY', 'AIzaSyA441e5WfEQvlj7u3Ghke0iIf7s8RlsURg')
  .run(function (API_KEY, $http) {

    chrome.extension.onMessage.addListener(
      function(request, sender, sendResponse) {
        if( request.type === 'openUrl' ) {
          chrome.tabs.update( sender.tab.id, {url: request.url});
        } else if (request.type === 'getTabUrl') {
          sendResponse(sender.tab.url);
        } else if (request.type === 'getVideoData') {
          $http({
            method: 'GET',
            url: 'https://www.googleapis.com/youtube/v3/videos?id=' + request.videoId + '&key=' +
            API_KEY + '&part=snippet'
          }).then(function success (response) {
            sendResponse(response);
          }, function error (response) {
            console.log(response);
          });
        }
        return true;
      }
    );

  });
})(angular);
