'use strict';

describe('Service: ClientesService', function () {

  // load the service's module
  beforeEach(module('stockDogApp'));

  // instantiate service
  var ClientesService;
  beforeEach(inject(function (_ClientesService_) {
    ClientesService = _ClientesService_;
  }));

  it('should do something', function () {
    expect(!!ClientesService).toBe(true);
  });

});
