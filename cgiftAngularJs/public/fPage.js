//binding the application with angularjs & injecting the dependencies
var firstPage = angular.module('firstPageApp', ['ngResource', 'ngRoute']);

firstPage.config(['$routeProvider', function($routeProvider){
  // configuring multiple pages with corresponding URLs, reflecting single page applications   
  $routeProvider
    .when('/', {templateUrl: '/loginPageView', controller: 'mainCtrl'})
    .when('/home', {templateUrl: '/homePageView', controller: 'homeCtrl'})    
    .when('/register', {templateUrl: 'registrationPageView',   controller: 'RegFormCtrl'})
    .otherwise({redirectTo: '/'});
}]);

//login form controller
firstPage.controller("mainCtrl",function($scope,$resource,$location){

  //initialization the login user model to nil
  $scope.logUser = {};
  
  // invoking the front-api responsible for login scenario
  $scope.loginUsr = function(){
    var logRes = $resource('/login');
    logRes.save({
      // getting the credentials from the login form
      "mail_id":$scope.logUser.email, 
      "password":$scope.logUser.password
    },
    // callback funtion from login api 
    function(state){
      if (state.msg != null){
        // error message in wrong invalid credentials
        $scope.logStatus=state.msg;
        $scope.logFailMsg = true;
        $scope.logUser = {};
      }
      else{
        $scope.logFailMsg = false;
        // redirecting to next page i.e home page on successful authentication
        $location.path('/home')
      }
    });
  }
});       

//registration form controller
firstPage.controller("RegFormCtrl", function($scope,$resource){

  //initialization the registration user model to nil
  $scope.regUser = {};
  
  //keeps sucess message hidden
  $scope.regSucessMsg = false;
  // invoking the front-api responsible for registration scenario
  $scope.registerUsr = function(){
    var regRes = $resource('/register');
    regRes.save({
      // getting the credentials from the registration form
      "first_name":$scope.regUser.fName, 
      "last_name":$scope.regUser.lName, 
      "mail_id":$scope.regUser.email, 
      "password":$scope.regUser.password
    },
    // callback funtion from registration api 
    function(state){
      $scope.regStatus=state.msg;    
      $scope.regSucessMsg = true;
      $scope.regUser = {};
    });
  }
});

// home-page controller
firstPage.controller("homeCtrl", function($scope){
  //initialization the login user model to nil
  $scope.parcel = {};
  
  $scope.packCollect = function(prcl){
    // some message after parcel is set
    $scope.confirmStatus="Thank you, The parcel will be collected on "+ prcl.dat+" from "+prcl.addrss+" by "+prcl.tim;
    $scope.confirmMsg=true; 

    this.parcel = {};

    $scope.nextParcel="Schedule another parcel";
    $scope.anotherParcelMsg=true;
  }
});

