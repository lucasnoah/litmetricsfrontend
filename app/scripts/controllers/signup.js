'use strict';

/**
 * @ngdoc function
 * @name litmetricsfrontendApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the litmetricsfrontendApp
 */
angular.module('litmetricsfrontendApp')
  .controller('SignupCtrl', function ($scope, authService) {

    $scope.signupData = {};
    $scope.signupSuccess = false;

    $scope.signupFields = [

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
        },
      {
            key: 'confirmPassword',
            type: 'input',
            templateOptions: {
                type: 'password',
                label: 'Confirm Password',
                placeholder: 'Confirm you password',
                required: true

            }
        }


    ]

    var parseErrors = function(errors) {
      var errorList = []
      angular.forEach(errors, function(value,key){
        errorList.push(key + ' : ' + value)
      })
      return errorList
    }

    $scope.registerUser = function(){

      authService.signUp($scope.signupData).success(function(d){
        alert('Your are signed up');
        $scope.signupSuccess = true
      }).error(function(e){
        $scope.formErrors = parseErrors(e)

      })

    }


  });
