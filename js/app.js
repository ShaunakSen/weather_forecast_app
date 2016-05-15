//MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//ROUTES
weatherApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        })
        .when('/forecast', {
            templateUrl: 'pages/forecast.html',
            controller: 'forecastController'
        })
});

//SERVICES

weatherApp.service('cityService', function () {
    this.city = "New York, NY";
});

//CONTROLLERS

weatherApp.controller('homeController', ['$scope', 'cityService', function ($scope, cityService) {
    $scope.$watch('city', function () {
        cityService.city = $scope.city;
    });

}]);

weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService', function ($scope, $resource, cityService) {
    $scope.city = cityService.city;
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",
        {
            callback: "JSON_CALLBACK"
        },
        {
            get: {method: "JSONP"}
        }
    );
    $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, APPID:'f6420f8a6552d25194e76b0ef94ccf8f', cnt: 7});
    console.log($scope.weatherResult);
    $scope.convertToCelcius = function(temp){
        return Math.round(temp-273);
    }
}]);
