'use strict';

/**
 * @ngdoc service
 * @name stockDogApp.Vendas
 * @description
 * # Vendas
 * Service in the stockDogApp.
 */
angular.module('stockDogApp')
  .service('VendasService', function VendasService($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return $resource('Vendas2.json');

  });
