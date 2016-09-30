'use strict';

/**
 * @ngdoc function
 * @name litmetricsfrontendApp.controller:FiltersCtrl
 * @description
 * # FiltersCtrl
 * Controller of the litmetricsfrontendApp
 */
angular.module('litmetricsfrontendApp')
  .controller('FiltersCtrl', function ($scope, corpusService, tokenService, filterService, $uibModal, usSpinnerService) {


    /*INIT THE DATA MODELS*/

    $scope.data = {}
    $scope.newData = {}
    $scope.data['stopwords'] = ''
    $scope.selectedFilter = {};

    /*ADD FILTER FORM*/





    // set ner answer default to true
    $scope.data.ner = false;

    /*STOPWORDS FORM*/

    $scope.stopwordsFormFields = [
      {
        "type": "textarea",
        "key": "stopwords",
        "templateOptions": {

          "rows": 6,
          "cols": 6
        }
      }

    ]

    //prepopulate stopwords


    /*LEMMA FORM*/

    $scope.lemmaFormFields = [
      {
        key: 'lemma',
        type: 'radio',
        templateOptions: {

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
      }
    ]
    $scope.nerFormFields = [
      {
        key: 'ner',
        type: 'radio',
        templateOptions: {

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
      }
    ]

    // set ner answer default to true
    $scope.data.lemma = true;


    /*POS FORM*/

    var buildPosTagFormFields = function (tagList) {
      //populate checkbox fields with pos tag names
      var posFields = [];

      for (var i = 0; i < tagList.length; i++) {

        var field = {
          id: tagList[i],
          title: tagList[i]
        }
        posFields.push(field)
      }
      return posFields
    }

    //build the pos option list
    var posOptions = buildPosTagFormFields(tokenService.getPosTokenList())
    $scope.posFormFields = [
      {
        key: 'pos',
        type: 'multiCheckbox',
        templateOptions: {
          label: 'POS TAGS',
          inline: true,


          options: posOptions,
          valueProp: 'id',
          labelProp: 'title'
        }
      }
    ];

    function getSelectedItemTokens(){
        usSpinnerService.spin('spinner-1');
        tokenService.grabTokensForCorpus($scope.selectedCorpusItem.id, 1).success(function (d) {
            usSpinnerService.stop('spinner-1')
        $scope.exampleTokens = d.results;
        //set pagination links
        $scope.nextTokenPage = d.next;
        $scope.previousTokenPage = d.previous;
        //run the original filter token filtering
        $scope.filteredTokens = tokenService.filterTokenByUserChoice($scope.exampleTokens, $scope.data).selected;
        $scope.removedTokens = tokenService.filterTokenByUserChoice($scope.exampleTokens, $scope.data).removed;

      });
    }

    //preset pos checkbox values
    $scope.data.pos = tokenService.getPosTokenList();
    /*LOAD PAGES AJAX DATA*/
    //grab user corpus items
    corpusService.getUserCorpusList().success(function (d) {
      //set the corpus items list
      $scope.corpusItems = d;
      //set the first option in the ng-options list
      $scope.selectedCorpusItem = $scope.corpusItems[0];
      //grab the sample tokens
      getSelectedItemTokens();

    });

    function init() {
      //grab user filters
      filterService.grabUserFilters().success(function (d) {
        $scope.filters = d;
        $scope.selectedFilter = $scope.filters[0];
      }).error(function (e) {

      });
    }
    init();


    /*CREATE AND UPDATE FILTERS*/

    $scope.openNewFilterModal = function () {
    var modalInstance = $uibModal.open({
      controller: 'NewfiltermodalCtrl',
      templateUrl: 'views/newfiltermodal.html'

    });

    modalInstance.result.then(function () {
      init();
    }, function () {

    });
  };

    $scope.saveFilter = function(){
      usSpinnerService.spin('spinner-1');
      filterService.updateFilter($scope.data, $scope.selectedFilter).success(function(d){
        init();
        usSpinnerService.stop('spinner-1');
      }).error(function(){
        usSpinnerService.stop('spinner-1');
        alert('there was an error saving the filter Please try again.');
      })
    }

    $scope.deleteFilter = function(){
      filterService.deleteFilter($scope.selectedFilter).success(function(d){
        console.log('DELETE SUCCESS',d)
        init()
      }).error(function(e){
        console.log('DELETE ERROR', e)
      })
    };

    /*WATCH FOR FORM VALUE CHANGES AND APPLY THEM TO THE FILTER*/

    //watch pos form data
    $scope.$watch('data.pos', function () {
      $scope.filteredTokens = tokenService.filterTokenByUserChoice($scope.exampleTokens, $scope.data).selected
      $scope.removedTokens = tokenService.filterTokenByUserChoice($scope.exampleTokens, $scope.data).removed

    });

    //watch lemma form data
    $scope.$watch('data.lemmas', function () {
      $scope.filteredTokens = tokenService.filterTokenByUserChoice($scope.exampleTokens, $scope.data).selected
      $scope.removedTokens = tokenService.filterTokenByUserChoice($scope.exampleTokens, $scope.data).removed
    });

    //watch stopwords form data
    $scope.$watch('data.stopwords', function () {
      $scope.filteredTokens = tokenService.filterTokenByUserChoice($scope.exampleTokens, $scope.data).selected
      $scope.removedTokens = tokenService.filterTokenByUserChoice($scope.exampleTokens, $scope.data).removed
    });

    //watch ner form data
    $scope.$watch('data.ner', function () {
      $scope.filteredTokens = tokenService.filterTokenByUserChoice($scope.exampleTokens, $scope.data).selected
      $scope.removedTokens = tokenService.filterTokenByUserChoice($scope.exampleTokens, $scope.data).removed
    });



    //watch filter selection
    $scope.$watch('selectedFilter', function(){
      console.log('selectedFilterChange', $scope.selectedFilter);
      $scope.data['stopwords'] = $scope.selectedFilter.filter_data.stopwords;
      $scope.data['pos'] = $scope.selectedFilter.filter_data.pos;
      $scope.data['ner'] = $scope.selectedFilter.filter_data.ner;
      $scope.data['lemma'] = $scope.selectedFilter.filter_data.lemma;
    });


    $scope.$watch('selectedCorpusItem', function(){
        getSelectedItemTokens();
    })


  });
