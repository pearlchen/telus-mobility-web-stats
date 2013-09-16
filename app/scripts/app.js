'use strict';

angular.module('infographicApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/en/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/fr/', {
        templateUrl: 'views/main-fr.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
