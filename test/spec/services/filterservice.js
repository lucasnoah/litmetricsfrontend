'use strict';

describe('Service: filterservice', function () {

  // load the service's module
  beforeEach(module('litmetricsfrontendApp'));

  // instantiate service
  var filterservice;
  beforeEach(inject(function (_filterservice_) {
    filterservice = _filterservice_;
  }));

  it('should do something', function () {
    expect(!!filterservice).toBe(true);
  });

});
