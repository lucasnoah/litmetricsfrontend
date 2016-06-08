'use strict';

/**
 * @ngdoc function
 * @name litmetricsfrontendApp.controller:TopicsCtrl
 * @description
 * # TopicsCtrl
 * Controller of the litmetricsfrontendApp
 */
angular.module('litmetricsfrontendApp')
  .controller('TopicsCtrl', function ($scope, topicModelingService, $window) {


    $scope.init = function(){
      topicModelingService.getYourTopics().success(function(d){
        $scope.topics = d;
        $scope.selectedTopicGroup = $scope.topics[0];
        topicModelingService.downloadCsv($scope.selectedTopicGroup.id).success(function(d){
        var blob = new Blob([d], { type: 'text/csv' });
        var url = $window.URL || $window.webkitURL;
        $scope.fileUrl = url.createObjectURL(blob);
      })
      })

    }


    $scope.init()


    $scope.viewTopic = function(topicGroup){
      $scope.selectedTopicGroup=topicGroup;
      topicModelingService.downloadCsv($scope.selectedTopicGroup.id).success(function(){
      var blob = new Blob([data], { type: 'text/csv' })
      var url = $window.URL || $window.webkitURL;
      $scope.fileUrl = url.createObjectURL(blob);
    })

    }







  });
