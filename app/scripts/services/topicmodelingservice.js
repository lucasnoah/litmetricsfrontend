'use strict';

/**
 * @ngdoc service
 * @name litmetricsfrontendApp.topicmodelingservice
 * @description
 * # topicmodelingservice
 * Service in the litmetricsfrontendApp.
 */
angular.module('litmetricsfrontendApp')
  .service('topicModelingService', function (API_URL, $http) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.modelTopics = function(modelingData){

      return $http.post(API_URL + 'models/model_topics/', modelingData)

    }

    this.getYourTopics = function(){
      return $http.get(API_URL +'models/')
    }


  });
