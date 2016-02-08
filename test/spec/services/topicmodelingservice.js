'use strict';

describe('Service: topicmodelingservice', function () {

  // load the service's module
  beforeEach(module('litmetricsfrontendApp'));

  // instantiate service
  var topicmodelingservice;
  beforeEach(inject(function (_topicmodelingservice_) {
    topicmodelingservice = _topicmodelingservice_;
  }));

  it('should do something', function () {
    expect(!!topicmodelingservice).toBe(true);
  });

});
