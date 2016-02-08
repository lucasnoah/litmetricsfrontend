'use strict';

describe('Controller: TopicmodelingCtrl', function () {

  // load the controller's module
  beforeEach(module('litmetricsfrontendApp'));

  var TopicmodelingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TopicmodelingCtrl = $controller('TopicmodelingCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TopicmodelingCtrl.awesomeThings.length).toBe(3);
  });
});
