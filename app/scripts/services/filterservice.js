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

    this.updateFilter = function(filter_data, filter){
      var data = {
        id: filter.id,
        filter_data: filter_data
      }
      return $http.post(API_URL + 'filters/save_filter/', data)
    }

    this.deleteFilter = function(filter){
      return $http.delete(API_URL + 'filters/' + filter.id.toString() + '/')
    }

    

  });
