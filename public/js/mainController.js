/**
 * Created by EK on 8/24/2015.
 */
(function (angular) {
    angular.module('ngViewExample.controllers', ['ngRoute', 'ngAnimate'])
        .controller('MainCtrl', ['$route', '$routeParams', '$location',
            function ($route, $routeParams, $location) {
                this.$route = $route;
                this.$location = $location;
                this.$routeParams = $routeParams;
            }])
        .controller('BookCtrl', ['$routeParams', function ($routeParams) {
            this.name = "BookCtrl";
            this.params = $routeParams;
        }])
        .controller('sp500Ctrl', function($scope, $http){
            $http.get('/api/sp500')
                .success(function(response) {$scope.data = response;});
            //$scope.data =
        })
        .controller('ChapterCtrl', ['$routeParams', function ($routeParams) {
            this.name = "ChapterCtrl";
            this.params = $routeParams;
        }]);
})(window.angular);