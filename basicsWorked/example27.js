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
									age: 34
								},
								{
									name: "mahesh",
									age: 45
								},
								{
									name: "prakar",
									age: 12
								}								
							]
						return avengersService;
					}
			)

function AvengersCtrl($scope, Avengers)
{
	$scope.avengers=Avengers;
}
