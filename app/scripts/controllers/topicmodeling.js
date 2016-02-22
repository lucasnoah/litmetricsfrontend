'use strict';

/**
 * @ngdoc function
 * @name litmetricsfrontendApp.controller:TopicmodelingCtrl
 * @description
 * # TopicmodelingCtrl
 * Controller of the litmetricsfrontendApp
 */
angular.module('litmetricsfrontendApp')
  .controller('TopicmodelingCtrl', function ($scope, filterService, corpusService, $uibModal, topicModelingService) {

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

    //object to dump form data
    $scope.topicModelingData = {};
      //form object
      //$scope.topicModelingForm = {};
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


/*TOPIC MODELING OPTIONS*/

     $scope.topicModelingFormFields = [
      {
        key: 'wordNetSense',
        type: 'radio',
        templateOptions: {

          label:'Attach WordNet sense ID to token?',
          options: [{
            value: true,
            name: 'YES',
          },
            {
              value: false,
              name: 'NO'
            }

          ]

        }
      },
       {
        key: 'lemmas',
        type: 'radio',
        templateOptions: {

          label:'use lemmas in place of words?',
          options: [{
            value: true,
            name: 'YES',
          },
            {
              value: false,
              name: 'NO'
            }

          ]

        }
      },
       {
        key: 'numTopics',
        type: 'input',
        templateOptions: {
          type:'number',
          label: 'Number of topics'

        }
      },
       {
        key: 'numPasses',
        type: 'input',
        templateOptions: {
          type:'number',
          label: 'Number of passes'

        }
      }


    ]



  //init lemma field value
    $scope.topicModelingData.lemmas = true;
    $scope.topicModelingData.wordNetSense = true;




    /* BUNDLE AND SEND OBJECTS TO BE TOPIC MODELED */

    $scope.modelTopics = function(){
      var data = {
        options: $scope.topicModelingData,
        collections: $scope.collectionsToModel
      }

      if (!data.collections.length  < 1){
        topicModelingService.modelTopics(data).success(function(d){

      })

      }

      else{
        alert('Please include at least on collection in your topic modeling data.');
      }
    }



  });
