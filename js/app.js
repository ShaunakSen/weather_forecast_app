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
        .when('/forecast/:days',{
            templateUrl: 'pages/forecast.html',
            controller: 'forecastController'
        })
});

//SERVICES

weatherApp.service('cityService', function () {
    this.city = "New York, NY";
});

weatherApp.service('daysService', function () {
    this.days = 7;
});

//CONTROLLERS

weatherApp.controller('homeController', ['$scope', 'cityService', 'daysService', function ($scope, cityService, daysService) {
    $scope.$watch('city', function () {
        cityService.city = $scope.city;
    });
    $scope.$watch('days', function () {
        daysService.days = $scope.days;
    });

}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', 'daysService', function ($scope, $resource, $routeParams, cityService, daysService) {
    $scope.city = cityService.city;
    $scope.days = daysService.days;
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",
        {
            callback: "JSON_CALLBACK"
        },
        {
            get: {method: "JSONP"}
        }
    );
    $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, APPID:'f6420f8a6552d25194e76b0ef94ccf8f', cnt: $scope.days});
    console.log($scope.weatherResult);
    $scope.convertToCelcius = function(temp){
        return Math.round(temp-273);
    };
    $scope.convertToDate = function(dt){
        return new Date(dt*1000);
    }
}]);

//DIRECTIVES

weatherApp.directive("weatherReport", function(){
    return{
        restrict: 'E',
        templateUrl: 'directives/weatherReport.html',
        replace: true,
        scope:{
            weatherDay: "=",
            convertToStandard: "&",
            convertToDate: "&",
            dateFormat: "@"
        }
    }
});
