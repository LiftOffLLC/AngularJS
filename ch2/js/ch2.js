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
        .when('/projects', {
          controller: 'ProjectCtrl',
          templateUrl: '/js/views/projects.html'
        })
        .otherwise({
          redirectTo: '/static/welcome'
        });
    }]);

//definition of the services for the app
ch2App.factory('projectRest',function($resource, $q){
  //REST-API for the user is invoked from here
  var Project = $resource("/project/:action",
    { action: '@action' },
    {
      'create': { method:'POST', params: {action: 'create'}},
    });

  return Project;
 });

//model for encapsulating data logic related to project
ch2App.factory('project',function($timeout){
  return {
    init: function(){
    },
  }
});

//definition of controller for the app
ch2App.controller('StaticCtrl', function($scope, $routeParams){
  $scope.routeTpl = '/js/views/'+$routeParams.current+'.html';
});

ch2App.controller('ProjectCtrl', function($scope, project){

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