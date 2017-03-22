'use strict';

describe('Controller: UltradashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('stockDogApp'));

  var UltradashboardCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UltradashboardCtrl = $controller('UltradashboardCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
