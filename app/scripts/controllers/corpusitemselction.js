'use strict';

/**
 * @ngdoc function
 * @name litmetricsfrontendApp.controller:CorpusitemselctionCtrl
 * @description
 * # CorpusitemselctionCtrl
 * Controller of the litmetricsfrontendApp
 */
angular.module('litmetricsfrontendApp')
  .controller('CorpusitemselctionCtrl', function ($scope, corpusService) {

    $scope.corpusAdditionData = {};
    $scope.getTokenCount = corpusService.getTokenSum;

    corpusService.getUserCorpusList().success(function(d){
      $scope.corpusItems = d;
    });

    corpusService.getUserCorpusCollections().success(function(d){
      $scope.corpusCollections = d;
      $scope.selectedCorpusCollection = $scope.corpusCollections[0];
      corpusService.getTokenSum($scope.selectedCorpusCollection);
    });


    $scope.corpusCollectionFields = [
      {
            key: 'collectionTitle',
            type: 'input',
            templateOptions: {
                type: 'text',
                label: 'Collection Name',
                placeholder: 'Enter a Title',
                required: true
            }
        }
    ];


    $scope.createCorpusCollection = function(){

      corpusService.createCorpusCollection($scope.corpusAdditionData.collectionTitle).success(function(d){
        $scope.corpusCollections = d;
        $scope.selectedCorpusCollection = $scope.corpusCollections[$scope.corpusCollections.length-1]
      }).error(function(e){
        alert(e)

      })

    };

    $scope.addItemsToCollection = function(){
      console.log('corpus item selections', $scope.corpusItemSelections)
      corpusService.addItemsToCorpusCollection($scope.corpusItemSelections, $scope.selectedCorpusCollection).success(function(d){
        var collectionKey = corpusService.matchCorpusItemById($scope.corpusCollections, d);
        $scope.corpusCollections[collectionKey] = d;
        $scope.selectedCorpusCollection = $scope.corpusCollections[collectionKey];

      }).error(function(){
        console.log('that did not work. please try again.')
      })

    }

    $scope.removeItemFromCollection = function(item, collection){

      corpusService.removeItemFromCollection(item, collection).success(function(d){
        //update the corpus collection and the selected corpus collection
        var collectionKey = corpusService.matchCorpusItemById($scope.corpusCollections, d);
        $scope.corpusCollections[collectionKey] = d;
        $scope.selectedCorpusCollection = $scope.corpusCollections[collectionKey];
      }).error(function(){
        //error handling needed

      })

    };



    $scope.$watch('corpusItemSelections', function(aval, bval){
      console.log('item selection change', aval, bval);
    })

  });
