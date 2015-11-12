(function (angular) {
  'use strict';
  angular.module('youtube-service', [
    'background-service'
  ])
  .service('YoutubeService', function ($q, BackgroundService) {
    var YoutubeService = this;
    YoutubeService.loaded = false;

    YoutubeService.getTitle = function (id) {
      var deferred = $q.defer();
      setTimeout(function () {
        deferred.resolve(id);
      }, 5000);
      return deferred.promise;
    };

    YoutubeService.getVideoData = function (videoId) {
      return BackgroundService.getVideo(videoId).then(function (video) {
        return {
          title: video.items[0].snippet.title,
          thumb: video.items[0].snippet.thumbnails.default.url,
          id: video.items[0].id
        };
      });
    };
  });
})(angular);
