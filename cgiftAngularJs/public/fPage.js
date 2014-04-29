//firstPageApp definition
var firstPage = angular.module('firstPageApp', ['ngResource']);

//login form controller
function LoginFormCtrl($scope,$resource) 
{
  //initialization the login user model to nil
  $scope.user = {};

  $scope.loginUsr = function()
  {
    //make the actual AJAX call to save
  }
}

//registration form controller
function RegFormCtrl($scope,$resource) 
{

  //initialization the registration user model to nil
  $scope.regUser = {};

  //keeps sucess message hidden
  $scope.regSucessMsg = false;
  
  $scope.registerUsr = function()
  {
    var regRes = $resource('/register');

    regRes.save(
                {
                    "first_name":$scope.regUser.fName, 
                    "last_name":$scope.regUser.lName, 
                    "mail_id":$scope.regUser.email, 
                    "password":$scope.regUser.password
                },

                function(state)
                {
                  $scope.regStatus=state.msg;    
                  $scope.regSucessMsg = true;
                  $scope.regUser = {};
                }
               );
  }
}
