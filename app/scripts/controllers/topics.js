'use strict';

/**
 * @ngdoc function
 * @name litmetricsfrontendApp.controller:TopicsCtrl
 * @description
 * # TopicsCtrl
 * Controller of the litmetricsfrontendApp
 */
angular.module('litmetricsfrontendApp')
  .controller('TopicsCtrl', function ($scope, topicModelingService) {


    $scope.init = function(){
      topicModelingService.getYourTopics().success(function(d){
        $scope.topics = d;
        $scope.selectedTopicGroup = $scope.topics[0];
        console.log($scope.topics, $scope.selectedTopicGroup)
      })

    }


    $scope.init()


    $scope.viewTopic = function(topicGroup){
      $scope.selectedTopicGroup=topicGroup;

    }


  });
