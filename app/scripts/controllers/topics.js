'use strict';

/**
 * @ngdoc function
 * @name litmetricsfrontendApp.controller:TopicsCtrl
 * @description
 * # TopicsCtrl
 * Controller of the litmetricsfrontendApp
 */
angular.module('litmetricsfrontendApp')
  .controller('TopicsCtrl', function ($scope, topicModelingService, $window, usSpinnerService) {

    $scope.init = function(){
       usSpinnerService.spin('spinner-1');
      topicModelingService.getYourTopics().success(function(d){

        $scope.topics = d;
        $scope.selectedTopicGroup = $scope.topics[0];
        topicModelingService.downloadCsv($scope.selectedTopicGroup.id).success(function(d){

        var blob = new Blob([d], { type: 'text/csv' });
        var url = $window.URL || $window.webkitURL;
        $scope.fileUrl = url.createObjectURL(blob);

      })
          usSpinnerService.stop('spinner-1');
      })
    };

    $scope.init();
    $scope.viewTopic = function(topicGroup){
      usSpinnerService.spin('spinner-2');
      $scope.selectedTopicGroup=topicGroup;
      topicModelingService.downloadCsv($scope.selectedTopicGroup.id).success(function(){
        usSpinnerService.stop('spinner-2');
      var blob = new Blob([data], { type: 'text/csv' });
      var url = $window.URL || $window.webkitURL;
      $scope.fileUrl = url.createObjectURL(blob);
    })
    }

  });
