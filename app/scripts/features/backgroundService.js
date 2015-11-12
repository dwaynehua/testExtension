(function (angular) {
  'use strict';
  angular.module('background-service', [])
  .service('BackgroundService', function ($q) {
    var BackgroundService = this;
    BackgroundService.openVideo = function (videoId) {
      chrome.extension.sendMessage({type: 'openUrl', url: 'https://www.youtube.com/watch?v=' + videoId});
    };

    BackgroundService.getTabUrl = function () {
      var deferred = $q.defer();
      chrome.extension.sendMessage({type: 'getTabUrl'}, function (tabUrl) {
        deferred.resolve(tabUrl);
      });
      return deferred.promise;
    };

    BackgroundService.getVideo = function (videoId) {
      var deferred = $q.defer();
      chrome.extension.sendMessage({type: 'getVideoData', videoId: videoId}, function (video) {
        deferred.resolve(video.data);
      });
      return deferred.promise;
    };
  });
})(angular);
