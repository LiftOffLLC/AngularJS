// LiftOff AngularJS Tutorial
// (c) 2013-2014 LiftOff LLC. http://www.liftoffllc.com
// License: MIT

//basic app definition
var ch2App = angular.module('ch2App', ['ngRoute', 'ngResource', 'firebase']);

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
        .when('/inheritance', {          
          templateUrl: '/js/views/inheritance.html'
        })
        .when('/timeout-bad', {
          controller: 'TimeoutbadCtrl',
          templateUrl: '/js/views/timeout.html'
        })
        .when('/timeout-better', {
          controller: 'TimeoutBetterCtrl',
          templateUrl: '/js/views/timeout.html'
        })
        .when('/ping-pong', {
          controller: 'PingPongCtrl',
          templateUrl: '/js/views/pingpong.html'
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
ch2App.factory('project',function($timeout, $firebase, projectRest){
  var project = {};
  return {
    init: function(){
    },
    save: function(input, cb){
      //TODO: do any other model specific logic
      // projectRest.create(project, function(data){
      // })
      //for now using firebase at data store
      var projects = $firebase(new Firebase('https://angularjs-meetup.firebaseio.com/projects'));
      var new_entry = {}
      new_entry[new Date().getTime()] = input;
      projects.$update(new_entry);
      cb({success: true});
    },
    load: function(){
      //we be loading from a static list for now
      return $firebase(new Firebase('https://angularjs-meetup.firebaseio.com'));
    }
  }
});

//definition of controller for the app
ch2App.controller('StaticCtrl', function($scope, $routeParams){
  $scope.routeTpl = '/js/views/'+$routeParams.current+'.html';
});

ch2App.controller('ProjectCtrl', function($scope, project){
  $scope.mode = 'list';
  $scope.openForm = function(){
    $scope.new_project = {};
    $scope.mode = 'mode';
    $scope.innerTpl = '/js/views/new_project.html';
  }
  $scope.list = function(){
    $scope.mode = 'list';
    $scope.innerTpl = '/js/views/list_projects.html';
    $scope.fbase = project.load();
  }
  $scope.create = function(){
    project.save($scope.new_project, function(data){
      $scope.list();
    })
  }
  $scope.list();
})

ch2App.controller('BaseCtrl', function($scope) {
    $scope.message = {};
    $scope.message.text = "Welcome to the meet";    
});

ch2App.controller('childController1', function($scope) {
  $scope.change = function(newLocation) {
    console.log("Existing value is " + $scope.message.text);
    $scope.message.text = newLocation;
  }
});

ch2App.controller('childController2', function($scope) {
  $scope.change = function(newLocation) {
    console.log("Existing value is " + $scope.message.text);
    $scope.message.text = newLocation;
  }
});

// chandan@liftoffllc.com
ch2App.controller('TimeoutbadCtrl', function($scope, $timeout){
  // Good practice, we did not create any scope level function
  pollJob();
  // bad usage: this code will run even when controller unloads
  function pollJob(){
    console.log('Bad practise: Poll Job Ping Pong at: ' + (new Date()));
    $timeout(pollJob, 5000);
  }
});


// chandan@liftoffllc.com
ch2App.controller('TimeoutBetterCtrl', function($scope, $timeout){
  // Good practice, we did not create any scope level function
  pollJob();
  function pollJob(){
    console.log('Good practise: Poll Job Ping Pong at: ' + (new Date()));
    $scope.promise = $timeout(pollJob, 10000);
  }
  // Good usage: destroy promise when controller unloads
  $scope.$on('$destroy', function() {
    if($scope.promise){
      $timeout.cancel($scope.promise);
    }
  });
});

// chandan@liftoffllc.com
ch2App.controller('PingPongCtrl', function($scope, $timeout){
  $scope.pingPong = {};
  $timeout(function(){
    $scope.pingPong.action = "ping"
  }, 5000);
});

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

//help in showing the subnavs
ch2App.directive('ping', function($timeout) {
  return {
    restrict: 'A',
    scope: {ref: '='},
    link: function(scope, elm, attr) {
      scope.$watch('ref.action', ping);
      function ping(){
        if(scope.ref.action === 'ping') {
          elm.addClass('animated bounce').html('ping at : ' + (new Date()));
          $timeout(function(){
            scope.ref.action = 'pong';
            elm.removeClass('animated bounce');
          }, 5000);
        }
      }
    }
  };
});

//help in showing the subnavs
ch2App.directive('pong', function($timeout) {
  return {
    restrict: 'A',
    scope: {ref: '='},
    link: function(scope, elm, attr) {
      scope.$watch('ref.action', ping);
      function ping(){
        if(scope.ref.action === 'pong') {
          elm.addClass('animated shake').html('passed on to pong : ' + (new Date()));
          $timeout(onTimeout, 5000);
        }
      }
      function onTimeout(){
        scope.ref.action = 'ping';
        elm.removeClass('animated shake');
      }
    }
  };
});
