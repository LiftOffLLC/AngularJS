'use strict';

//basic app definition
var inheritanceApp = angular.module('inheritanceApp', []);

//base controller, can hold anything useful across pages
var BaseCtrl = function($scope, $timeout) {

  //get current time
  $scope.getCurrentTime = function(){
    return (new Date).toString();
  }
}

var LogCtrl = function($scope, $timeout) {

}

var UserCtrl = function($scope, $timeout) {

}

//attach the controller to the app
inheritanceApp.controller('BaseCtrl', BaseCtrl);

//attach the controller to the app
inheritanceApp.controller('UserCtrl', UserCtrl);

//attach the controller to the app
inheritanceApp.controller('LogCtrl', LogCtrl);