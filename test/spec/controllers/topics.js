'use strict';

describe('Controller: TopicsCtrl', function () {

  // load the controller's module
  beforeEach(module('litmetricsfrontendApp'));

  var TopicsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TopicsCtrl = $controller('TopicsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TopicsCtrl.awesomeThings.length).toBe(3);
  });
});
