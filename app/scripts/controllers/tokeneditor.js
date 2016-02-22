'use strict';

/**
 * @ngdoc function
 * @name litmetricsfrontendApp.controller:TokeneditorCtrl
 * @description
 * # TokeneditorCtrl
 * Controller of the litmetricsfrontendApp
 */
angular.module('litmetricsfrontendApp')
  .controller('TokenEditorCtrl', function ($scope, token, tokenService, API_URL, $http) {

    $scope.token = token;
    $scope.tokenData = token;
    console.log('editor token', token)


    /*form data object*/

    /*form fields*/
    $scope.tokenFields = [

      //original
      {
        key: 'original_text',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: 'Original Text',
          placeholder: $scope.token.word
        }
      },

      //lemma
      {
        key: 'lemma',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: 'lemma',
          placeholder: $scope.token.lemma
        }
      },

      //pos
      {
  "key": 'pos',
  "type": "select",
  "templateOptions": {
    "label": "POS tag",
    "valueProp": "name",
    "options": tokenService.getPosSelectList(),


  }
},

      //NER
       {
  "key": 'ner',
  "type": "select",
  "templateOptions": {
    "label": "NER",
    "valueProp": "name",
    "options": [{name:'O'},{name:'PERSON'},{name:'LOCATION'}, {name:'ORGANIZATION'}, {name:'MISC'}, {name:'MONEY'},
      {name:'NUMBER'}, {name:'ORDINAL'}, {name:'PERCENT'},{name:'DATE'}, {name:'TIME'}, {name:'DURATION'},{name:'SET'}],


  }
}



    ]

    //update token
    $scope.updateToken = function(){
      var newData =  $scope.tokenData
      console.log('presned data', $scope.tokenData)
      $http.patch(API_URL + 'tokens/' + token.id + '/update_token/', newData).success(function(d){
      console.log(d )
        $scope.$close(d);
    }).error(function(e){
       alert(e);
      })

    }






  });
