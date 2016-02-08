'use strict';

/**
 * @ngdoc function
 * @name litmetricsfrontendApp.controller:FiltersCtrl
 * @description
 * # FiltersCtrl
 * Controller of the litmetricsfrontendApp
 */
angular.module('litmetricsfrontendApp')
  .controller('FiltersCtrl', function ($scope, corpusService, tokenService) {


    //initilaize data models
    $scope.data = {}
    $scope.newData = {}
    $scope.data['stopwords'] = ''



    $scope.newFilterFormFields = [
      {
            key: 'title',
            type: 'input',
            templateOptions: {
                type: 'text',
                label: 'Filter Title',
                placeholder: 'Enter a filter name',
                required: true
            }
        }

    ]

    /*NER FORM*/

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
    var stopwords_basic_english = ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours',
      'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its',
      'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that',
      'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having',
      'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while',
      'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after',
      'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further',
      'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more',
      'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very',
      's', 't', 'can', 'will', 'just', 'don', 'should', 'now'];
    $scope.data.stopwords = stopwords_basic_english.join(",");

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


          options: posOptions,
          valueProp: 'id',
          labelProp: 'title'
        }
      }
    ]

    //preset pos checkbox values
    $scope.data.pos = tokenService.getPosTokenList();




    /*LOAD PAGES AJAX DATA*/

    //grab user corpus items
    corpusService.getUserCorpusList().success(function (d) {
      //set the corpus items list
      $scope.corpusItems = d;
      //set the first option in the ng-options list
      $scope.selectedCorpusItem = $scope.corpusItems[0];
    })

    //grab the sample tokens
    tokenService.grabTokensForCorpus(1, 400, 0).success(function (d) {
      $scope.exampleTokens = d.results;
      //set pagination links
      $scope.nextTokenPage = d.next;
      $scope.previousTokenPage = d.previous;
      //run the original filter token filtering
      $scope.filteredTokens = tokenService.filterTokenByUserChoice($scope.exampleTokens, $scope.data)

    })

    /*WATCH FOR FORM VALUE CHANGES AND APPLY THEM TO THE FILTER*/

    //watch pos form data
  $scope.$watch('data.pos', function(){
            $scope.filteredTokens = tokenService.filterTokenByUserChoice($scope.exampleTokens, $scope.data)
  })

    //watch lemma form data
    $scope.$watch('data.lemmas', function(){
            $scope.filteredTokens = tokenService.filterTokenByUserChoice($scope.exampleTokens, $scope.data)

  })

    //watch stopwords form data
    $scope.$watch('data.stopwords', function(){
            $scope.filteredTokens = tokenService.filterTokenByUserChoice($scope.exampleTokens, $scope.data)
  })

    //watch ner form data
    $scope.$watch('data.ner', function(){
            $scope.filteredTokens = tokenService.filterTokenByUserChoice($scope.exampleTokens, $scope.data)
  })







  });
