'use strict';

/**
 * @ngdoc service
 * @name stockDogApp.Filiais
 * @description
 * # Filiais
 * Service in the stockDogApp.
 */
angular.module('stockDogApp')
  .service('FiliaisService', function FiliaisService($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return $resource('Filiais.json');
  });
