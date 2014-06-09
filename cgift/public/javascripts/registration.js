//registration form controller
firstPage.controller("RegFormCtrl", function($scope,$resource){
  //initialization the registration user model to nil
  $scope.regUser = {};
  //keeps sucess message hidden
  $scope.regSucessMsg = false;
  $scope.registerUsr = function(){
    var regRes = $resource('/register/registerCall');
    regRes.save({
      "first_name":$scope.regUser.fName, 
      "last_name":$scope.regUser.lName, 
      "mail_id":$scope.regUser.email, 
      "password":$scope.regUser.password
    },
    function(state){
      $scope.regStatus=state.msg;    
      $scope.regSucessMsg = true;
      $scope.regUser = {};
    });
  }
});
