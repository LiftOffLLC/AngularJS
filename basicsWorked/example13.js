var app= angular.module("myApp", []);

app.factory("Data", function()
					{
						return {name:"I am data from service"};
					}
			)

app.filter("reverse", function()
					  {
					  	return function(text)
					  	{
							return text.split("").reverse().join("");
					  	}	
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
