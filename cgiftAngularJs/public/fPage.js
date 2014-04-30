//firstPageApp definition
var firstPage = angular.module('firstPageApp', ['ngResource']);

//login form controller
function LoginFormCtrl($scope,$resource) 
{
  //initialization the login user model to nil
  $scope.logUser = {};
  $scope.loginForm=true;

console.log(this);

  $scope.loginUsr = function()
  {
    var logRes = $resource('/login');

    logRes.save(
                {
                    "mail_id":$scope.logUser.email, 
                    "password":$scope.logUser.password
                },

                function(state)
                {
                  if (state.msg != null)    
                  {
                    $scope.logStatus=state.msg;
                    $scope.logFailMsg = true;
  
                  }
                  else
                  {
                    $scope.logFailMsg = false;
                  
                    $scope.loginForm=false;
                  
                    $scope.homePage="/home";
                    // $(document).ready(function()
                    //          {
                    //             $scope.dat.datepicker({ minDate: -20, maxDate: "+2M"});
                    //          }
                    //         );
                    $scope.logoutFlag = true;
                  }
                  $scope.logUser = {};
                }                  
               );
  }                
  
  $scope.packCollect =  function(prcl)
  {
    $scope.confirmStatus="Thank you, The parcel will be collected on "+ prcl.dat+" from "+prcl.addrss+" by "+prcl.tim;
    $scope.confirmMsg=true; 

    this.parcel = {};

    $scope.nextParcel="Schedule another parcel";
    $scope.anotherParcelMsg=true;
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
