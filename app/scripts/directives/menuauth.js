'use strict';

/**
 * @ngdoc directive
 * @name litmetricsfrontendApp.directive:menuauth
 * @description
 * # menuauth
 */
angular.module('litmetricsfrontendApp')
  .controller('MenuAuthDirectiveCtrl', function($sessionStorage, $location, $scope){
    $scope.storage = $sessionStorage
    if ($scope.storage.token == null || undefined){
      $scope.loggedIn = false;
    }
    else{
      $scope.loggedIn = true;
    }

    $scope.signIn = function(){
      $location.path('/login');
    }

    $scope.signUp = function(){
      $location.path('/signup');
    }

    $scope.logout = function(){
      $scope.storage.token = undefined;
      $location.path('/login');
      $scope.loggedIn = false;
      console.log('logged out');
    }


  })

  .directive('menuauth', function () {
    return {
      templateUrl: 'views/menuauthdirective.html',
      restrict: 'E',
      controller: 'MenuAuthDirectiveCtrl',

    };
  });
