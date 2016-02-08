'use strict';

/**
 * @ngdoc directive
 * @name litmetricsfrontendApp.directive:textupload
 * @description
 * # textupload
 */
angular.module('litmetricsfrontendApp')

  .controller('TextUploadCtrl', function($scope, API_URL, Upload, $timeout){

     $scope.textuploadData = {}

     $scope.textUploadFields = [

      {
            key: 'title',
            type: 'input',
            templateOptions: {
                type: 'text',
                label: 'Title',
                placeholder: 'Enter a title for this text.',
                required: true
            }
        }

    ]

     $scope.uploadFile = function(file) {
    file.upload = Upload.upload({
      url: API_URL + 'texts/',
      data: {file: $scope.textuploadData.file, title: $scope.textuploadData.title},
    });

    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;
      });
    }, function (response) {
      if (response.status > 0)
        $scope.errorMsg = response.status + ': ' + response.data;
    }, function (evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
    }
  })

  .directive('textupload', function () {
    return {
      templateUrl: 'views/TextUploadDirective.html',
      restrict: 'E',
      controller: 'TextUploadCtrl',
    };
  });
