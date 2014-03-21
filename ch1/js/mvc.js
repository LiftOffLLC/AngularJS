//basic app definition
var mvcApp = angular.module('mvcApp', []);
function mvcCtrl($scope) {
  $scope.formView = './formview.html';
  $scope.student = {};
  $scope. successMsg = false; 
  $scope.regrStud = function(){
    //TODO: make the actual AJAX call to save
    $scope.successMsg = true; 
  }
}
