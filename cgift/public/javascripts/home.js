// home-page controller
firstPage.controller("homeCtrl", function($scope){
   $scope.nextParcel="";
  //initialization the login user model to nil
  $scope.parcel = {};
  $scope.packCollect = function(prcl){
    $scope.confirmStatus="Thank you, The parcel will be collected on "+ prcl.dat+" from "+prcl.addrss+" by "+prcl.tim;
    $scope.confirmMsg=true; 
    this.parcel = {};
    $scope.nextParcel="Schedule another parcel";
    $scope.anotherParcelMsg=true;
  }
});
