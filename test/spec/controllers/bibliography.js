'use strict';

describe('Controller: BibliographyCtrl', function () {

  // load the controller's module
  beforeEach(module('litmetricsfrontendApp'));

  var BibliographyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BibliographyCtrl = $controller('BibliographyCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BibliographyCtrl.awesomeThings.length).toBe(3);
  });
});
