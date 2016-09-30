'use strict';

/**
 * @ngdoc function
 * @name litmetricsfrontendApp.controller:DeletecorpusitemcontrollerCtrl
 * @description
 * # DeletecorpusitemcontrollerCtrl
 * Controller of the litmetricsfrontendApp
 */
angular.module('litmetricsfrontendApp')
  .controller('DeletecorpusitemcontrollerCtrl', function ($scope, corpusItem, corpusService, $uibModalInstance) {
    $scope.corpusItem = corpusItem;

    $scope.cancelDelete = function(){
      $uibModalInstance.dismiss('Canceled')
    }
    $scope.delete = function () {
      corpusService.deleteCorpusItem(corpusItem).success(function (d) {
        $uibModalInstance.close()

      }).error(function (e) {
        alert('Error deleting.  Please try again.')
      })
    }

  });
