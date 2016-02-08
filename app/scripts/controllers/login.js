'use strict';

/**
 * @ngdoc function
 * @name litmetricsfrontendApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the litmetricsfrontendApp
 */
angular.module('litmetricsfrontendApp')
  .controller('LoginCtrl', function ($scope, authService,$sessionStorage, $location) {

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
      authService.login($scope.loginInfo)
        .success(function (data) {
          $scope.storage.token = data.auth_token;
          $location.path('/main')
        })
        .error(function () {
          console.log('loginFail')

        })

    }
  });

