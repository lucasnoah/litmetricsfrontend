'use strict';

/**
 * @ngdoc directive
 * @name litmetricsfrontendApp.directive:corpuslist
 * @description
 * # corpuslist
 */




angular.module('litmetricsfrontendApp')


  .controller('corpusListDirectiveCtrl', function($scope, corpusService, $uibModal){
    console.log($scope.showProcessing);
    function init()
    {
      corpusService.getUserCorpusList().success(function (d) {
        var input = d;
        var processing = [];
        var doneProcessing = [];
        console.log('got the d', d);
        for (var i = 0; i < input.length; i++) {

          console.log('input i', input[i].is_processing)
          if (input[i].is_processing) {
            processing.push(input[i]);
          }
          else {
            doneProcessing.push(input[i]);
          }
        }
        $scope.processing = processing;
        $scope.doneProcessing = doneProcessing;
        console.log('out', processing, doneProcessing)
      })
    }

    init();

    $scope.deleteCorpusItemModal = function(corpusItem){

      var modalInstance = $uibModal.open({
      controller: 'DeletecorpusitemcontrollerCtrl',
      templateUrl: 'views/DeleteCorpusItemModal.html',
      resolve: {
        corpusItem: corpusItem
      }

    });

    modalInstance.result.then(function () {
      init();
    }, function () {

    });

    }


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
