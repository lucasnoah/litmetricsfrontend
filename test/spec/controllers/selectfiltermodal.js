'use strict';

describe('Controller: SelectfiltermodalCtrl', function () {

  // load the controller's module
  beforeEach(module('litmetricsfrontendApp'));

  var SelectfiltermodalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SelectfiltermodalCtrl = $controller('SelectfiltermodalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SelectfiltermodalCtrl.awesomeThings.length).toBe(3);
  });
});
