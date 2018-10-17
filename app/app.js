var app = angular.module('fdcApp', ['ngRoute', 'ngAnimate']);


//All Route Function here
app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/', {
            controller: 'homeCtrl',
            templateUrl: 'templates/home.html'
        })
        .when('/about', {
            controller: 'aboutCtrl',
            templateUrl: 'templates/about.html'
        })
        .when('/constitution', {
            controller: 'constiCtrl',
            templateUrl: 'templates/constitution.html'
        })
        .when('/news', {
            controller: 'newsCtrl',
            templateUrl: 'templates/news.html'
        })
        .when('/gallery', {
            controller: 'galleryCtrl',
            templateUrl: 'templates/gallery.html'
        })
        .otherwise({redirectTo: '/'});
}]);