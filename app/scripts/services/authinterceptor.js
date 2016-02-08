'use strict';

/**
 * @ngdoc service
 * @name litmetricsfrontendApp.authInterceptor
 * @description
 * # authInterceptor
 * Factory in the litmetricsfrontendApp.
 */
angular.module('litmetricsfrontendApp')
 .factory('authInterceptor', function ($q, $window, $location, $sessionStorage) {

        return {
            request: function (config) {
                config.headers = config.headers || {};
	            if (config.url.substr(config.url.length - 5) == '.html') {
                    return config;
                    }

                if ($sessionStorage.token) {


                    config.headers.Authorization = 'Token ' + $sessionStorage.token;

                }

	            else{

	                delete config.headers.Authorization;
                }
                return config;

            },
            response: function (response) {


                if (response.status === 401) {
                    // handle the case where the user is not authenticated
                    //$location.path('/login');
                    console.log('please log in');
                }
                return response || $q.when(response);
            }
        };
    });
