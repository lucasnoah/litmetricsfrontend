'use strict';

/**
 * @ngdoc function
 * @name litmetricsfrontendApp.controller:TopicmodelingCtrl
 * @description
 * # TopicmodelingCtrl
 * Controller of the litmetricsfrontendApp
 */
angular.module('litmetricsfrontendApp')
  .controller('TopicmodelingCtrl', function ($scope, filterService, corpusService, $uibModal) {

    /*INITIALIZE SCOPE VARIABLES*/

    $scope.init = function(){
      //filters
    filterService.grabUserFilters().success(function(d){
      $scope.filters = d;
    })

    //corpus collections
    corpusService.getUserCorpusCollections().success(function(d){
      $scope.collections = d;
      //init select object
      $scope.selectedCorpusCollection = $scope.collections[0]
    })



    }

    $scope.init();

    /*INITIALIZE FORM FIELDS*/

    $scope.collectionsToModel = []

    /*ADD AND REMOVE COLLECTIONS*/

    $scope.addCorpusCollection = function(collection){
      //check to see if collection is in list before adding
      if($scope.collectionsToModel.indexOf(collection) < 0){
        //set filter to default
        collection['filter'] = {name:'default'}
        $scope.collectionsToModel.push(collection)


      }

    }


    $scope.removeCorpusCollection = function(collection){
      $scope.collectionsToModel.splice(collection, 1)
    }

    /*ASSIGN FILTER OPTIONS FOR EACH COLLECTION*/

    //filter edit modal
    $scope.editFilter = function (collection) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'views/selectFilterModal.html',
      controller: 'selectFilterModalCtrl',
      resolve: {
        collection: function () {
          return collection;
        },
        filters: function(){
          return $scope.filters
        }
      }
    });

    modalInstance.result.then(function (result) {
      console.log('returned result', result)
      var collectionIndex = $scope.collectionsToModel.indexOf(result['collection']);
      result['collection']['filter'] = result['filter'];
      $scope.collectionsToModel[collectionIndex] = result['collection'];

    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };











  });
