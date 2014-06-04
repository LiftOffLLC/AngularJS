//firstPageApp definition
var firstPage = angular.module('firstPageApp', ['ngResource', 'ngRoute']);

firstPage.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/', {templateUrl: '/login/loginPageView', controller: 'mainCtrl'})
    .when('/home', {templateUrl: '/homePageView', controller: 'homeCtrl'})    
    .when('/register', {templateUrl: '/register/registrationPageView',   controller: 'RegFormCtrl'})
    .otherwise({redirectTo: '/'});
}]);
