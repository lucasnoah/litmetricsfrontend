'use strict';

describe('Service: tokenservice', function () {

  // load the service's module
  beforeEach(module('litmetricsfrontendApp'));

  // instantiate service
  var tokenservice;
  beforeEach(inject(function (_tokenservice_) {
    tokenservice = _tokenservice_;
  }));

  it('should do something', function () {
    expect(!!tokenservice).toBe(true);
  });

});
