'use strict';

describe('Service: corpusService', function () {

  // load the service's module
  beforeEach(module('litmetricsfrontendApp'));

  // instantiate service
  var corpusService;
  beforeEach(inject(function (_corpusService_) {
    corpusService = _corpusService_;
  }));

  it('should do something', function () {
    expect(!!corpusService).toBe(true);
  });

});
