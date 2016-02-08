'use strict';

describe('Directive: menuauth', function () {

  // load the directive's module
  beforeEach(module('litmetricsfrontendApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<menuauth></menuauth>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the menuauth directive');
  }));
});
