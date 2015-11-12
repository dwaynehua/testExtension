(function (angular) {
  'use strict';
  angular.module('storage-service', [])
  .service('StorageService', function ($q) {
    var StorageService = this;
    StorageService.get = function () {
      var deferred = $q.defer();
      chrome.storage.local.get('vid-list', function (result) {
        if(chrome.runtime.lastError) {
          deferred.reject(chrome.runtime.lastError);
        } else {
          deferred.resolve(result['vid-list']);
        }
      });
      return deferred.promise;
    };
    StorageService.set = function (list) {
      var deferred = $q.defer();
      chrome.storage.local.set({'vid-list': list}, function () {
        if (chrome.runtime.lastError) {
          deferred.reject(chrome.runtime.lastError);
        } else {
          deferred.resolve();
        }
      });
      return deferred.promse;
    };
    StorageService.add = function (video) {
      function initializeArray(list) {
        if(!angular.isArray(list)) {
          list = [];
        }
        return list;
      }
      function addToList (list) {
        list.unshift(video);
        return list;
      }
      return StorageService.get()
      .then(initializeArray)
      .then(addToList)
      .then(StorageService.set);
    };
    StorageService.getListIndex = function () {
      var deferred = $q.defer();
      chrome.storage.local.get('vid-list-index', function (result) {
        if(chrome.runtime.lastError) {
          deferred.reject(chrome.runtime.lastError);
        } else {
          deferred.resolve(result['vid-list-index'] || 0);
        }
      });
      return deferred.promise;
    };
    StorageService.setListIndex = function (index) {
      var deferred = $q.defer();
      chrome.storage.local.set({'vid-list-index': index}, function () {
        if (chrome.runtime.lastError) {
          deferred.reject(chrome.runtime.lastError);
        } else {
          deferred.resolve();
        }
      });
      return deferred.promse;
    };
  });
})(angular);
