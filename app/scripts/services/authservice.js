'use strict';

/**
 * @ngdoc service
 * @name litmetricsfrontendApp.authservice
 * @description
 * # authservice
 * Service in the litmetricsfrontendApp.
 */
angular.module('litmetricsfrontendApp')
  .service('authService', function ($http, API_URL) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.login = function (loginData) {
      var data = loginData
      return $http.post(API_URL + 'auth/login/', data)
    }

    this.signUp = function (signupData) {

      var data = {
        username: signupData['username'],
        email: signupData['username'],
        password: signupData['password']

      }

      return $http.post(API_URL + 'auth/register/', data)

    }

  });

