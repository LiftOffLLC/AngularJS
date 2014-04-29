// LiftOff AngularJS Tutorial
// (c) 2013-2014 LiftOff LLC. http://www.liftoffllc.com
// License: MIT

//basic app definition
var mvcApp = angular.module('mvcApp', []);
function mvcCtrl($scope) {
  //enables to dynamically load the view
  $scope.formView = './formview.html';

  //init the model as blank onload
  $scope.student = {};

  //keeps sucess message hidden
  $scope.successMsg = false;
  
  $scope.regrStud = function()
  {
    //TODO: make the actual AJAX call to save
    $scope.successMsg = true;
  }
}
