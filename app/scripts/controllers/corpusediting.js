'use strict';

/**
 * @ngdoc function
 * @name litmetricsfrontendApp.controller:CorpuseditingCtrl
 * @description
 * # CorpuseditingCtrl
 * Controller of the litmetricsfrontendApp
 */
angular.module('litmetricsfrontendApp')

  .controller('CorpuseditingCtrl', function ($scope, corpusService, tokenService , $q, $http, $uibModal, usSpinnerService) {
     //preset pos checkbox values
    $scope.data = {}
    $scope.data.pos = tokenService.getPosTokenList();
    $scope.navigateFormData = {};
    $scope.currentPage = 1;

    $scope.navigateFormFields = [

      {
            className:'col-xs-2',
            key: 'pageNumber',
            type: 'input',
            defaultValue: $scope.currentPage,
            templateOptions: {
                type: 'number',
                placeholder: $scope.currentPage,
            }
        }
    ];



    /*LOAD PAGES AJAX DATA*/

    //grab user corpus items
    corpusService.getUserCorpusList().success(function (d) {
      //set the corpus items list
      $scope.corpusItems = d;
      //set the first option in the ng-options list
      $scope.selectedCorpusItem = $scope.corpusItems[0];
      $scope.numPages = getNumberOfPages($scope.selectedCorpusItem.token_count, 700)
      $scope.currentPage = 1
      getTokens(1);
    })

    //grab the sample tokens
    function getTokens(pageNum) {
      usSpinnerService.spin('spinner-1');
      tokenService.grabTokensForCorpus($scope.selectedCorpusItem.id, pageNum).success(function (d) {
        usSpinnerService.stop('spinner-1');
        $scope.exampleTokens = d.results;
        //set pagination links
        $scope.nextTokenPage = d.next;
        $scope.previousTokenPage = d.previous;
        //run the original filter token filtering
        $scope.currentPage = pageNum;
        //$scope.navigateFormFields[0].label = $scope.currentPage + " of: " + $scope.numPages;

      }).error(function(){
        usSpinnerService.stop('spinner-1');
      })
    }

    function getNumberOfPages(num_objects, item_per_page_count){
      return Math.ceil(num_objects/item_per_page_count)
    }

    $scope.getTokens = getTokens;
    /*HANDLE HIGHLIGHTING OF POS TAGS*/

    //BUILD POS TAG LIST
    $scope.buildPosList = function(){
      var posList = []
      angular.forEach($scope.data.pos, function(value, key){
        var posItem = {
          tag: value,
          highlight: false,
          background:'white'
        }
        posList.push(posItem)

      })
      return posList
    };




    //grab color vs tags list
  function makeButtons() {
    $scope.buttonList = []
    angular.forEach(tokenService.getPosColorList(), function (value, key) {
      var button = value;
      button['highlight'] = false;
      $scope.buttonList.push(button)
    })
    console.log('buttonlist', $scope.buttonList)

  }
  makeButtons();

    //grab the buttons color
    $scope.getButtonColorObject = function(button){
      return {'background-color': button.color}
    }

    //return background color from style
    $scope.getBackgroundColorObject = function(tag){

      //find out its corresponding button object
      var b  = $scope.buttonList[$scope.buttonList.map(function(e) { return e.tag; }).indexOf(tag)];

      if (b.highlight){
        return {'color': b.color}
      }
      else{
        return {'color': 'black'}
      }
    }

    $scope.toggleButtonHighlight = function(button){

      if(button.highlight){
        button.highlight = false;
      }
      else{
        button.highlight= true;
      }

    }



    /*HANDLE CORPUS TOKEN NAVIGATION*/
    $scope.toggleToNextSetOfTokens = function(url){

      var defered  = $q.defer()
      $http.get(url).success(function(d){
        console.log(d)
        $scope.exampleTokens = d.results;
      //set pagination links
      $scope.nextTokenPage = d.next;
      $scope.previousTokenPage = d.previous;
        defered.resolve

      })
      return defered

    }

    /*TOKEN EDITING*/
    $scope.openTokenEditor = function(token){
      var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'views/tokeneditor.html',
      controller: 'TokenEditorCtrl',
      resolve: {
        token: function () {
          return token;
        }
      }
    });

    modalInstance.result.then(function (updatedToken) {
      /*replace token on the page*/
    }, function () {

    });
    }
  });
