'use strict';

/**
 * @ngdoc directive
 * @name litmetricsfrontendApp.directive:LockedCollectionUpload
 * @description
 * # LockedCollectionUpload
 */
angular.module('litmetricsfrontendApp')

  .controller('LockedCollectionUploadCtrl', function($scope, API_URL, Upload, $timeout, $route,usSpinnerService){

     $scope.collectionUploadData = {};

     $scope.collectionUploadFields = [

      {
            key: 'title',
            type: 'input',
            templateOptions: {
                type: 'text',
                label: 'Title',
                placeholder: 'Enter a title for the locked collection.',
                required: true
            }
        }

    ];

     $scope.uploadFile = function(file) {
       usSpinnerService.spin('spinner-1');
    file.upload = Upload.upload({
      url: API_URL + 'texts/',
      data: {file: $scope.collectionUploadData.file, title: $scope.collectionUploadData.title, collection:true},
    });

    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;
        usSpinnerService.stop('spinner-1');
        alert('It worked! When your text is done processing and available to work on you will recieve an email and It will show up on the site. feel free to upload another.');
        $route.reload();
      });
    }, function (response) {
      if (response.status > 0)
        usSpinnerService.stop('spinner-1');
        $scope.errorMsg = response.status + ': ' + response.data;
      console.log($scope.errorMsg);
    }, function (evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      console.log(file.progress);
    });
    }
  })


  .directive('lockedCollectionUpload', function () {
    return {
      templateUrl: 'views/LockedCollectionUpload.html',
      restrict: 'E',
      controller: 'LockedCollectionUploadCtrl',
    };
  });
