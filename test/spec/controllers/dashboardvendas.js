'use strict';

describe('Controller: DashboardvendasCtrl', function () {

  // load the controller's module
  beforeEach(module('stockDogApp'));

  var DashboardvendasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DashboardvendasCtrl = $controller('DashboardvendasCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
