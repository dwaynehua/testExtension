(function(angular) {
  'use strict';
  var app = angular.module('thisApp', [
    'ngRoute',
    'storage-service',
    'youtube-service',
    'background-service'
  ]);

  app.config(function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'template.html',
      controller: 'TestController',
      controllerAs: 'view'
    }).otherwise({
      redirectTo: '/'
    });
  })
  .controller('TestController', function (StorageService, YoutubeService, BackgroundService) {
    var view = this;
    StorageService.get().then(function (list) {
      view.vids = list || [];
    });

    function listContains(id) {
      var result = false;
      for(var i = 0; i < view.vids.length; i++) {
        if(view.vids[i].id === id) {
          result = true;
          break;
        }
      }
      return result;
    }

    view.toggle = function () {
      view.hidden = !view.hidden;
    };

    view.next = function () {
      StorageService.getListIndex().then(function (index) {
        index++;
        if(index > view.vids.length) {
          index = 0;
        }
        StorageService.setListIndex(index);
        BackgroundService.openVideo(view.vids[index].id);
      });
    };

    view.prev = function () {
      StorageService.getListIndex().then(function (index) {
        index--;
        if(index < 0) {
          index = view.vids.length - 1;
        }
        StorageService.setListIndex(index);
        BackgroundService.openVideo(view.vids[index].id);
      });
    };

    view.add = function () {
      view.getVideoId().then(function (videoId) {
        YoutubeService.getVideoData(videoId).then(function (video) {
          if(!listContains(video.id)) {
            StorageService.add(video);
            view.vids.unshift(video);
          } else {
            console.log('DUPLICATE DETECTED, SKIPPING.');
          }
        });
      });
    };

    view.getVideoId = function () {
      return BackgroundService.getTabUrl().then(function (url) {
        return url.match(/.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/)[1];
      });
    };

  });
})(angular);
