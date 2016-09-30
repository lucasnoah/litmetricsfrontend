'use strict';

/**
 * @ngdoc function
 * @name litmetricsfrontendApp.controller:NewfiltermodalCtrl
 * @description
 * # NewfiltermodalCtrl
 * Controller of the litmetricsfrontendApp
 */
angular.module('litmetricsfrontendApp')
  .controller('NewfiltermodalCtrl', function ($uibModalInstance, $scope, tokenService, filterService) {
    $scope.newFilter = {};

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
          }];

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

    $scope.newFilter['stopwords'] = stopwords_basic_english.join(",");
    $scope.newFilter['pos'] = tokenService.getPosTokenList();
    $scope.newFilter['lemma'] = true;
    $scope.newFilter['ner'] = true

    $scope.addFilter = function () {
      filterService.createFilter($scope.newFilter, $scope.newFilter.title).success(function (d) {
        $uibModalInstance.close('');
      }).error(function (e) {
        alert('There was an error creating your filter')
      })

    };

    $scope.cancel =  function(){$uibModalInstance.dismiss('');};  



  });
