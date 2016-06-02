'use strict';

/**
 * @ngdoc directive
 * @name litmetricsfrontendApp.directive:menuauth
 * @description
 * # menuauth
 */
angular.module('litmetricsfrontendApp')
  .controller('MenuAuthDirectiveCtrl', function($sessionStorage, $location, $scope, $auth, $rootScope){
    $scope.storage = $sessionStorage;
    $rootScope.loggedIn = $auth.isAuthenticated();
    $scope.loggedIn = $rootScope.loggedIn;



    $scope.signIn = function(){
      $location.path('/login');
    }

    $scope.signUp = function(){
      $location.path('/signup');
    }

    $scope.logout = function(){

      $auth.logout()
  .then(function(response) {
    // Redirect user here after a successful log in.
    $rootScope.loggedIn = $auth.isAuthenticated();
    $location.path('/login')
  })
  .catch(function(response) {
    // Handle errors here, such as displaying a notification
    // for invalid email and/or password.
  });

    }

    $scope.$watch('$rootScope.loggedIn', function(val){
      console.log('I am watching')
      $scope.loggedIn = val;

    });


  })



  .directive('menuauth', function () {
    return {
      templateUrl: 'views/menuauthdirective.html',
      restrict: 'E',
      controller: 'MenuAuthDirectiveCtrl',

    };
  });
