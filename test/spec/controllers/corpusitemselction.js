'use strict';

describe('Controller: CorpusitemselctionCtrl', function () {

  // load the controller's module
  beforeEach(module('litmetricsfrontendApp'));

  var CorpusitemselctionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CorpusitemselctionCtrl = $controller('CorpusitemselctionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CorpusitemselctionCtrl.awesomeThings.length).toBe(3);
  });
});
