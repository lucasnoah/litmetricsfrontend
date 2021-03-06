'use strict';

/**
 * @ngdoc function
 * @name litmetricsfrontendApp.controller:MalletCtrl
 * @description
 * # MalletCtrl
 * Controller of the litmetricsfrontendApp
 */
angular.module('litmetricsfrontendApp')
  .controller('MalletCtrl', function ($scope, filterService, corpusService, $uibModal, topicModelingService, usSpinnerService) {
    /*INITIALIZE SCOPE VARIABLES*/

    $scope.init = function () {
      //filters
      filterService.grabUserFilters().success(function (d) {
        $scope.filters = d;
      });

      //corpus collections
      corpusService.getUserCorpusCollections().success(function (d) {
        $scope.collections = d;
        //init select object
        $scope.selectedCorpusCollection = $scope.collections[0]
      });

      //object to dump form data
      $scope.topicModelingData = {};
      //form object
      //$scope.topicModelingForm = {};
    };

    $scope.init();

    /*INITIALIZE FORM FIELDS*/

    $scope.collectionsToModel = [];

    /*ADD AND REMOVE COLLECTIONS*/

    $scope.addCorpusCollection = function (collection) {
      //check to see if collection is in list before adding
      if ($scope.collectionsToModel.indexOf(collection) < 0) {
        //set filter to default
        collection['filter'] = {name: 'default'}
        $scope.collectionsToModel.push(collection)


      }

    };


    $scope.removeCorpusCollection = function (collection) {
      $scope.collectionsToModel.splice(collection, 1)
    };

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
          filters: function () {
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

          label: 'Attach WordNet sense ID to token?',
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

          label: 'use lemmas in place of words?',
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
          type: 'number',
          label: 'Number of Topics [integer, max 1000]: Represents the actual number of topics the corpus is estimated to contain.  The researcher determines the number of topics and informs the Topic Modeler the number of topics to for the Modeler to locate.  '

        }
      },
      {
        key: 'top_n',
        type: 'input',
        templateOptions: {
          type: 'number',
          label: 'number of words per topic to show in results.'

        }
      },
      {
        key: "chunking",
        type: "select",
        templateOptions: {
          label: "Chunking: [integer, max 10,000]: Can be used to alter the number of documents the Topic Modeler works with. A single large text can be arbitrarily chunked into documents of n-tokens in length, or, the researcher can insert a special character allowing a single large document to be split at logical “topic” break points – chapters, paragraphs, sections, and so forth.",
          "valueProp": "name",
          "options": [
            {
              "name": "none"
            },
            {
              "name": "count"
            },
            {
              "name": "breakword"
            }

          ]
        }
      },
      {
        key: 'chunk_size',
        type: 'input',
        templateOptions: {
          type: 'number',
          label: 'Chunk Size: The word count size that you want to split each document  into before it hits the topic modeling processing.  This can radically effect the outcome of your topic models'

        },
        hideExpression: function(){
          return $scope.topicModelingData.chunking !== 'count';
        }
      }



    ]

    /*
     alpha = kwargs.get('alpha') or 'auto'

     #: default is 50 supposedly increasing is not particularly useful, lowering can be useful if # ofdocuments is small
     iterations = kwargs.get('iterations') or 50
     #
     gamma_threshold = kwargs.get('gamma_threshold') or 0.001
     #
     minimum_probability = kwargs.get('minimum_probability') or 0.01
     */

    //init lemma field value
    $scope.topicModelingData.lemmas = true;
    $scope.topicModelingData.wordNetSense = true;
    $scope.topicModelingData.alpha = 'auto';
    $scope.topicModelingData.chunking = 'none';
    $scope.topicModelingData.gamma_threshold = 0.001;
    $scope.topicModelingData.iterations = 50;
    $scope.topicModelingData.minimum_probability =0.01;


    /* BUNDLE AND SEND OBJECTS TO BE TOPIC MODELED */

    $scope.modelTopics = function () {
      usSpinnerService.spin('spinner-1');
      var data = {
        options: $scope.topicModelingData,
        collections: $scope.collectionsToModel
      }

      if (!data.collections.length < 1) {
        topicModelingService.malletModelTopics(data).success(function () {
          usSpinnerService.stop('spinner-1');
          alert('Your topic-modeling is now processing.  You will be sent an email upon completion and will be able to view your results in the modeling results tab.')

        })

      }

      else {
        usSpinnerService.stop('spinner-1');
        alert('Please include at least on collection in your topic modeling data.');
      }
    }


  });
