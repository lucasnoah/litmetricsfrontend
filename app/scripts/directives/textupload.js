'use strict';

/**
 * @ngdoc directive
 * @name litmetricsfrontendApp.directive:textupload
 * @description
 * # textupload
 */
angular.module('litmetricsfrontendApp')

  .controller('TextUploadCtrl', function($scope, API_URL, Upload, $timeout, $route,usSpinnerService){

    $scope.textUploadData = {};
    $scope.textUploadData.vard = false;
    $scope.textUploadData.fScore = 1;
    $scope.textUploadData.threshold = 30;

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
        },

             {
        type: "checkbox",
        key: "vard",
        templateOptions: {
          label: "Normalize Spelling With Vard",
          required:false
        }
      },
       {
            key: 'fScore',
            type: 'input',
            templateOptions: {
                type: 'number',
                label: 'f-score',
                placeholder: 'Integer',
                required: false
            }
        },
       {
            key: 'threshold',
            type: 'input',
            templateOptions: {
                type: 'number',
                label: 'Threshold Integer',
                placeholder: 'Integer',
                required: false
            }
        }


    ];

     $scope.uploadFile = function(file) {
       usSpinnerService.spin('spinner-1');
       console.log('the file', $scope.textUploadData.file);
    file.upload = Upload.upload({
      url: API_URL + 'texts/',
      data: {
        file: $scope.textUploadData.file,
        title: $scope.textUploadData.title,
        collection: false,
        vard: $scope.textUploadData.vard,
        fScore: $scope.textUploadData.fScore,
        threshold: $scope.textUploadData.threshold

      },
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

  .directive('textupload', function () {
    return {
      templateUrl: 'views/TextUploadDirective.html',
      restrict: 'E',
      controller: 'TextUploadCtrl',
    };
  });
