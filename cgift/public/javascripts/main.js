//login form controller
firstPage.controller("mainCtrl",function($scope,$resource,$location){
  //initialization the login user model to nil
  $scope.logUser = {};
  $scope.loginUsr = function(){
    var logRes = $resource('/login/loginCall');
    logRes.save(
    // {query parameters to be send in the URL},
    {
      "mail_id":$scope.logUser.email, 
      "password":$scope.logUser.password
    },
    //call back function on SUCCESS
    function(state){
      if (state.msg != null){
        $scope.logStatus=state.msg;
        $scope.logFailMsg = true;
        $scope.logUser = {};
      }
      else{
        $scope.logFailMsg = false;
        $location.path('home')
      }
    } 
    //error handling function on FAILURE
    // , unction(err){

    //}
    );
  }
}); 
