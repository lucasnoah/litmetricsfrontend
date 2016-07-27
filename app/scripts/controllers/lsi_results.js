'use strict';

/**
 * @ngdoc function
 * @name litmetricsfrontendApp.controller:LsiResultsCtrl
 * @description
 * # LsiResultsCtrl
 * Controller of the litmetricsfrontendApp
 */
angular.module('litmetricsfrontendApp')
  .controller('LsiResultsCtrl', function ($scope, topicModelingService, $window) {
    $scope.init = function(){
      topicModelingService.getLsiResults().success(function(d){
        $scope.results = d;
        $scope.selectedResultGroup = $scope.results[0];
        //topicModelingService.downloadCsv($scope.selectGroup.id).success(function(d){
        //var blob = new Blob([d], { type: 'text/csv' });
        //var url = $window.URL || $window.webkitURL;
        //$scope.fileUrl = url.createObjectURL(blob);
      //})
      })

    }

    $scope.init()
    $scope.viewResult = function(result){
      $scope.selectedResultGroup=result;
      //topicModelingService.downloadCsv($scope.selectedTopicGroup.id).success(function(){
      //var blob = new Blob([data], { type: 'text/csv' })
      //var url = $window.URL || $window.webkitURL;
      //$scope.fileUrl = url.createObjectURL(blob);
    //})

    }
  });
