'use strict';

describe('Directive: textupload', function () {

  // load the directive's module
  beforeEach(module('litmetricsfrontendApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<textupload></textupload>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the textupload directive');
  }));
});
