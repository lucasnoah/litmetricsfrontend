'use strict';

/**
 * @ngdoc filter
 * @name litmetricsfrontendApp.filter:processing
 * @function
 * @description
 * # processing
 * Filter in the litmetricsfrontendApp.
 */
angular.module('litmetricsfrontendApp')
  .filter('processing', function () {
    return function (input) {
      var processing = [];
      var doneProcessing = [];
      for(var i=0; i < input.length(),i++;){
        if (input[i]['is_processing'] == true){
          processing.push(input[i]);
        }
        else{
          doneProcessing.push(input[i]);
        }
      }
      return {
        processing: processing,
        finished: doneProcessing
    };
      
  }});
