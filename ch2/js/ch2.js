// LiftOff AngularJS Tutorial
// (c) 2013-2014 LiftOff LLC. http://www.liftoffllc.com
// License: MIT

//basic app definition
var ch2App = angular.module('ch2App', ['ngRoute', 'ngResource']);

//app route definitions
ch2App.config(['$routeProvider', function($routeProvider) {
      $routeProvider
        .when('/static/:current', {
          controller: 'StaticCtrl',
          template: '<div ng-include="routeTpl"></div>'
        })
        .when('/detail/:step', {
          controller: 'DetailCtrl',
          template: '<div ng-include="routeTpl" class="pane login"></div>'
        })
        .otherwise({
          redirectTo: '/static/welcome'
        });
    }]);

ch2App.controller('StaticCtrl', function($scope, $routeParams){
  $scope.routeTpl = '/js/views/'+$routeParams.current+'.html';
})

//help in showing the subnavs
ch2App.directive('loNav', function($rootScope) {
  return {
    restrict: 'A',
    link: function(scope, elm, attr) {
      var attrParams = scope.$eval(attr.loNav);
      $rootScope.$on('$routeChangeSuccess', function(scope, next, current) {
        if(next.$$route && window.location.hash.indexOf(attrParams.tab) >= 0) {
          elm.parent().children().removeClass('active');
          elm.addClass('active');
        }
      });
    }
  };
});