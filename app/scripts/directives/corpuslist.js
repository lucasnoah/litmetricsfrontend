'use strict';

/**
 * @ngdoc directive
 * @name litmetricsfrontendApp.directive:corpuslist
 * @description
 * # corpuslist
 */




angular.module('litmetricsfrontendApp')


  .controller('corpusListDirectiveCtrl', function($scope, corpusService){
    console.log('items', $scope.items)

    corpusService.getUserCorpusList().success(function(d){
      $scope.items = d;
    })




  })

  .directive('corpuslist', function () {
    return {
      templateUrl: 'views/corpusListDirective.html',
      restrict: 'E',
      controller: 'corpusListDirectiveCtrl',
      scope: {
            items: '='
        }
    };
  });
