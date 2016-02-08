'use strict';

/**
 * @ngdoc function
 * @name litmetricsfrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the litmetricsfrontendApp
 */
angular.module('litmetricsfrontendApp')
  .controller('MainCtrl', function ($scope) {

    var a = {title:'funbox', processing:true}
    var b = {title:'notFunBox', processing:false}

    $scope.items = [a,b]

  });
