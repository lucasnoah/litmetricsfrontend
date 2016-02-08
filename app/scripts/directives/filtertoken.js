'use strict';

/**
 * @ngdoc directive
 * @name litmetricsfrontendApp.directive:filtertoken
 * @description
 * # filtertoken
 */
angular.module('litmetricsfrontendApp')

  .controller('filterTokenCtrl', function($scope, $attrs){
    console.log('attrs',$attrs.token)
    console.log('directive token', $scope.token)

  })

  .directive('filtertoken', function () {
    return {
      templateUrl: 'views/filterTokenDirective.html',
      restrict: 'E',
      scope: {
            token:'@',
            pos: '=',
            lemma: '=',
            ner:'=',
            stopword: '='
        },
      controller:'filterTokenCtrl',


    };
  });
