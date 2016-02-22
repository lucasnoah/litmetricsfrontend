'use strict';

describe('Controller: TokeneditorCtrl', function () {

  // load the controller's module
  beforeEach(module('litmetricsfrontendApp'));

  var TokeneditorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TokeneditorCtrl = $controller('TokeneditorCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TokeneditorCtrl.awesomeThings.length).toBe(3);
  });
});
