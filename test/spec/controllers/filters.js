'use strict';

describe('Controller: FiltersCtrl', function () {

  // load the controller's module
  beforeEach(module('litmetricsfrontendApp'));

  var FiltersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FiltersCtrl = $controller('FiltersCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FiltersCtrl.awesomeThings.length).toBe(3);
  });
});
