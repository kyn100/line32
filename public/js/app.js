/**
 * Created by EK on 8/24/2015.
 */
(function (angular) {
    'use strict';
    angular.module('ngViewExample', ['ngRoute', 'ngAnimate', 'ngViewExample.controllers'])
        .config(['$routeProvider', '$locationProvider',
            function ($routeProvider, $locationProvider) {
                $routeProvider
                    .when('/about', {
                        templateUrl: 'partials/book.html',
                        controller: 'BookCtrl'
                    })
                    .when('/hello', {
                        templateUrl: 'partials/hello.html'
                    })
                    .when('/sp500', {
                        templateUrl: 'partials/sp500.html',
                        controller: 'sp500Ctrl'
                    })
                    .otherwise({
                        redirectTo: '/about'
                    });

                $locationProvider.html5Mode({
                    enabled: true,
                    requireBase: false
                });
            }]);
})(window.angular);