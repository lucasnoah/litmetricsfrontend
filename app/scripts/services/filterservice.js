'use strict';

/**
 * @ngdoc service
 * @name litmetricsfrontendApp.filterservice
 * @description
 * # filterservice
 * Service in the litmetricsfrontendApp.
 */
angular.module('litmetricsfrontendApp')
  .service('filterService', function ($http, API_URL) {

    this.grabUserFilters = function(){
      return $http.get(API_URL + 'filters/')
    }

    this.createFilter = function(filter, title){
      console.log('filter data', filter)
      var data = {
        filter_data:filter,
        name: title
      }

      return $http.post(API_URL + 'filters/', data)
    }

  });
