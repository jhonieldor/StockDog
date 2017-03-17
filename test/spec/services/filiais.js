'use strict';

describe('Service: Filiais', function () {

  // load the service's module
  beforeEach(module('stockDogApp'));

  // instantiate service
  var Filiais;
  beforeEach(inject(function (_Filiais_) {
    Filiais = _Filiais_;
  }));

  it('should do something', function () {
    expect(!!Filiais).toBe(true);
  });

});
