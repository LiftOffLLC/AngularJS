var service_sample = angular.module("service_sample", ['ngResource']);

//Declaring the service to get data from the json package
service_sample.factory('data_service', ['$resource', function ($resource, $scope) {
  var data_resource = $resource('json/:file',{},{
    'getList' : { method:'GET', params: {file : "list.json"} }
  });

  return data_resource;
}]);

var serials_controller = function($scope, data_service){
  $scope.populateSerials = function(){
    data_service.getList({}, {},
      function(data){
        $scope.series_list = data.list;
        $scope.pg_display  = "show_serials";
      },
      $scope.alertError);
  };
  $scope.getSerialActors = function(serial_json_file){
    data_service.get({file : serial_json_file}, {},
      function(data){
        $scope.current_serial = data;
        $scope.pg_display     = "show_serial_characters";
      },
      $scope.alertError);
  };

  $scope.alertError = function(err){
    console.error("Error happened:");
    console.error(err);
  };
  $scope.populateSerials();
};

service_sample.controller("series", serials_controller);