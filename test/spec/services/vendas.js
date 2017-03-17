'use strict';

describe('Service: Vendas', function () {

  // load the service's module
  beforeEach(module('stockDogApp'));

  // instantiate service
  var Vendas;
  beforeEach(inject(function (_Vendas_) {
    Vendas = _Vendas_;
  }));

  it('should do something', function () {
    expect(!!Vendas).toBe(true);
  });

});
