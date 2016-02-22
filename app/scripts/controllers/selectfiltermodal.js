'use strict';

/**
 * @ngdoc function
 * @name litmetricsfrontendApp.controller:SelectfiltermodalCtrl
 * @description
 * # SelectfiltermodalCtrl
 * Controller of the litmetricsfrontendApp
 */
angular.module('litmetricsfrontendApp')
  .controller('selectFilterModalCtrl', function ($scope, $uibModalInstance, collection, filters) {

    $scope.filters = filters;
    $scope.collection = collection;
    $scope.selectedFilter = $scope.filters[0];

    $scope.save = function(){
      $uibModalInstance.close({filter:$scope.selectedFilter, collection:$scope.collection});
    }

  });
