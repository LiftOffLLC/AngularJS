var app= angular.module("myApp", []);

app.factory("Data", function()
					{
						return {name:"I am data from service"}
					}
			)

function FirstCtrl($scope, Data)
{
	$scope.data=Data;
}

function SecondCtrl($scope, Data)
{
	$scope.data=Data;
}
