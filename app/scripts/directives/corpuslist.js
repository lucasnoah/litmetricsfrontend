'use strict';

/**
 * @ngdoc directive
 * @name litmetricsfrontendApp.directive:corpuslist
 * @description
 * # corpuslist
 */




angular.module('litmetricsfrontendApp')


  .controller('corpusListDirectiveCtrl', function($scope, corpusService){
    console.log($scope.showProcessing);

    corpusService.getUserCorpusList().success(function(d){
      var input = d;
      var processing = [];
      var doneProcessing = [];
      console.log('got the d', d);
      for(var i=0; i < input.length;i++){

        console.log('input i', input[i].is_processing)
        if (input[i].is_processing){
          processing.push(input[i]);
        }
        else{
          doneProcessing.push(input[i]);
        }
      }
      $scope.processing = processing;
      $scope.doneProcessing = doneProcessing;
      console.log('out', processing, doneProcessing)
    })


  })

  .directive('corpuslist', function () {
    return {
      templateUrl: 'views/corpusListDirective.html',
      restrict: 'E',
      controller: 'corpusListDirectiveCtrl',
      scope: {
            items: '=',
            showProcessing: '='
        }
    };
  });
