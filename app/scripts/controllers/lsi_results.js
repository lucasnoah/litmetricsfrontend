'use strict';

/**
 * @ngdoc function
 * @name litmetricsfrontendApp.controller:LsiResultsCtrl
 * @description
 * # LsiResultsCtrl
 * Controller of the litmetricsfrontendApp
 */
angular.module('litmetricsfrontendApp')
  .controller('LsiResultsCtrl', function ($scope, topicModelingService, $window, usSpinnerService) {
    $scope.init = function(){
      usSpinnerService.spin('spinner-1');
      topicModelingService.getLsiResults().success(function(d){
         usSpinnerService.stop('spinner-1');
        $scope.results = d;
        $scope.selectedResultGroup = $scope.results[0];
        //topicModelingService.downloadCsv($scope.selectGroup.id).success(function(d){
        //var blob = new Blob([d], { type: 'text/csv' });
        //var url = $window.URL || $window.webkitURL;
        //$scope.fileUrl = url.createObjectURL(blob);
      //})
      })
    };

    $scope.init()
    $scope.viewResult = function(result){
       usSpinnerService.stop('spinner-1');
      $scope.selectedResultGroup=result;
      //topicModelingService.downloadCsv($scope.selectedTopicGroup.id).success(function(){
      //var blob = new Blob([data], { type: 'text/csv' })
      //var url = $window.URL || $window.webkitURL;
      //$scope.fileUrl = url.createObjectURL(blob);
    //})

    }
  });
