var app= angular.module("myApp", []);

app.factory("Avengers", function()
						{
							var avengersService={};
							avengersService.cast=
							[
								{
									name: "sagar",
									age: 23
								},
								{
									name: "harsha",
									age: 24
								}
							]
						return avengersService;
					}
			)

function AvengersCtrl($scope, Avengers)
{
	$scope.avengers=Avengers;
}
