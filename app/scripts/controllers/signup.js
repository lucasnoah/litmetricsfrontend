'use strict';

/**
 * @ngdoc function
 * @name litmetricsfrontendApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the litmetricsfrontendApp
 */
angular.module('litmetricsfrontendApp')
  .controller('SignupCtrl', function ($scope, $auth, $location) {

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
        console.log(value);
        if (value['username']){
          console.log('its the username')
          errorList.push('username' + ' : ' + value['username'])
        }

      })
      return errorList
    }

    $scope.registerUser = function(){

      $auth.signup($scope.signupData)
  .then(function(response) {
    // Redirect user here to login page or perhaps some other intermediate page
    // that requires email address verification before any other part of the site
    // can be accessed.
    alert('Your are signed up');
        $location.path('/login')
  })
  .catch(function(response) {
    // Handle errors here.
     $scope.formErrors = parseErrors(response)
  });


    }


  });
