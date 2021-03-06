'use strict';

/**
 * @ngdoc function
 * @name litmetricsfrontendApp.controller:HdpCtrl
 * @description
 * # HdpCtrl - handles submission of hdp topic models.
 * Controller of the litmetricsfrontendApp
 */
angular.module('litmetricsfrontendApp')
  .controller('HdpCtrl', function ($scope, filterService, corpusService, $uibModal, topicModelingService, usSpinnerService) {
     /*INITIALIZE SCOPE VARIABLES*/

    $scope.init = function () {
      //filters
      filterService.grabUserFilters().success(function (d) {
        $scope.filters = d;
      })

      //corpus collections
      corpusService.getUserCorpusCollections().success(function (d) {
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

    $scope.addCorpusCollection = function (collection) {
      //check to see if collection is in list before adding
      if ($scope.collectionsToModel.indexOf(collection) < 0) {
        //set filter to default
        collection['filter'] = {name: 'default'}
        $scope.collectionsToModel.push(collection)


      }

    }


    $scope.removeCorpusCollection = function (collection) {
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

    /*

    (Hierarchical Dirlecht Process): requires training corpus, infers number of topics:

Chunksize defaults to 256 {batch size in Wang article: that’s the number of DOCUMENTS used in each

iteration, NOT a chunking at the document level}

kappa defaults to 1.0 = learning rate {exponential decay rate} {default 0.51 based on Online LDA paper}

{little kappa is “How quickly old information is forgotten”

tau defaults to 64 = slow down parameter {downweights earlier iterations}

Kappa {might be Cap “K”} defaults to 15 = second level truncation level [Number of topics]

T defaults to 150 = top level truncation level [truncation is MAX number of topics for a document]

alpha defaults to 1 = second level concentration

gamma defaults to 1 = first level concentration

eta defaults to 0.01 = the topic dirichlet

scale defaults to 1

Var_converge defaults to 0.0001

Switch for optimal ordering of topics
     */

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
        key: 'alpha',
        type: 'input',
        templateOptions: {
          type: 'number',
          label: 'Alpha'

        }
      },
      {
        key: 'gamma',
        type: 'input',
        templateOptions: {
          type: 'number',
          label: 'gamma [integer, default 1 max 5]: the threshold occurrence for a term to be assigned to a topic T. “1” is the most likely appropriate value.'

        }
      },

      {
        key: 'kappa',
        type: 'input',
        templateOptions: {
          type: 'number',
          label: 'kappa [default .51, the decay rate, a decimal from 0-5]: Decay, as described above under Gensim.'
        }
      },

       {
        key: 'tau',
        type: 'input',
        templateOptions: {
          type: 'number',
          label: 'tau [default 64, max 500]: The parameter that will down-weight results from earlier iterations, this is similar to the “Update Every” parameter under Gensim above.'
        }
      },
      {
        key: 'T',
        type: 'input',
        templateOptions: {
          type: 'number',
          label: 'T [default 150, max 500]: The Top Level truncation, i.e., the LARGEST possible number of Topics in the corpus. User will not necessarily receive this many as results.'
        }
      },
      {
        key: 'K',
        type: 'input',
        templateOptions: {
          type: 'number',
          label: 'Kappa [decimal, 15, Max 100]: Largest number of “topics” [i.e. tokens] possible per document / chunk, the second, lower level of the hierarchy.'
        }
      },

      {
        key: 'eta',
        type: 'input',
        templateOptions: {
          type: 'number',
          label: 'eta [minimum probability]: Same as Gensim above for Minimum Probability.'
        }
      },
      {
        key: 'scale',
        type: 'input',
        templateOptions: {
          type: 'number',
          label: 'Scale [integer, default 1]: {I cannot find anything in documentation or literature that describes what “scale” refers to. Perhaps this should be a coded default and not be set by user}.'
        }
      },
      {
        key: 'var_converge',
        type: 'input',
        templateOptions: {
          type: 'number',
          label: 'Var Converge [decimal, default .0001, max 1]: The minimum frequency of a token to be assigned to a topic, similar to Gensim above “gamma threshold”.'
        }
      },


      {
        key: "chunking",
        type: "select",
        templateOptions: {
          label: "Chunking: chunks documents into smaller pieces.  Done through either the special breakword breakword or by word count",
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
    $scope.topicModelingData.chunking = 'none';
    $scope.topicModelingData.kappa = 1.0;
    $scope.topicModelingData.tau = 64.0;
    $scope.topicModelingData.alpha = 1;
    $scope.topicModelingData.gamma = 1;
    $scope.topicModelingData.eta = 0.01;
    $scope.topicModelingData.scale = 1.0;
    $scope.topicModelingData.var_converge = 0.0001
    $scope.topicModelingData.T = 150
    $scope.topicModelingData.K = 15


    /* BUNDLE AND SEND OBJECTS TO BE TOPIC MODELED */

    $scope.modelTopics = function () {
      usSpinnerService.spin('spinner-1');
      var data = {
        options: $scope.topicModelingData,
        collections: $scope.collectionsToModel
      }

      if (!data.collections.length < 1) {
        topicModelingService.hdpModelTopics(data).success(function (d) {
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
