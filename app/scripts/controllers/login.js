'use strict';

/**
 * @ngdoc function
 * @name litmetricsfrontendApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the litmetricsfrontendApp
 */
angular.module('litmetricsfrontendApp')
  .controller('LoginCtrl', function ($scope, authService,$sessionStorage, $location, $auth, $rootScope) {

    $scope.storage = $sessionStorage;

    $scope.loginInfo = {};

    $scope.loginFields = [

      {
            key: 'username',
            type: 'input',
            templateOptions: {
                type: 'email',
                label: 'Email address',
                placeholder: 'Enter email',
                required: true
            }
        },
        {
            key: 'password',
            type: 'input',
            templateOptions: {
                type: 'password',
                label: 'Password',
                placeholder: 'Enter you password',
                required: true
            }
        }


    ]

    $scope.loginUser = function() {
      $auth.login($scope.loginInfo)
  .then(function(response) {
    // Redirect user here after a successful log in.
    $rootScope.loggedIn = true;
    $location.path('/')
  })
  .catch(function(response) {
    // Handle errors here, such as displaying a notification
    // for invalid email and/or password.
    alert('login failed please try again');
  });


    }
  });

