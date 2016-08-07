'use strict';

/**
 * @ngdoc function
 * @name litmetricsfrontendApp.controller:DownloadCollectionsCtrl
 * @description
 * # DownloadCollectionsCtrl
 * Controller of the litmetricsfrontendApp
 */
angular.module('litmetricsfrontendApp')
  .controller('DownloadCollectionsCtrl', function ($scope, corpusService, filterService, usSpinnerService, $window) {

    $scope.getTokenSum = corpusService.getTokenSum;

    function init() {
      corpusService.getUserCorpusCollections().success(function (d) {
        $scope.corpusCollections = d;
        $scope.selectedCorpusCollection = $scope.corpusCollections[0];
      });

      //grab user filters
    filterService.grabUserFilters().success(function(d){
      $scope.filters = d;
      $scope.filters.push({name:"default"});
      $scope.filters.push({name:"none"});
      $scope.selectedFilter = $scope.filters[0];

    }).error(function(e){

    });
    }

    init();

    $scope.export = function(){
      usSpinnerService.spin('spinner-1');
      corpusService.exportCollection($scope.selectedCorpusCollection, $scope.selectedFilter).success(function(d){
        //make link available
        var blob = new Blob([d], { type: 'text/plain' });
        var url = $window.URL || $window.webkitURL;
        $scope.fileUrl = url.createObjectURL(blob);
        usSpinnerService.stop('spinner-1');
      }).error(function(){
        usSpinnerService.stop('spinner-1');
        alert('something went wrong. please try again.')
      })
    }

  });
