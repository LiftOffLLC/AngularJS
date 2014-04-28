var app=angular.module("myApp",[]);

app.directive("flash",function()
						{
							return {
										restrict: 'A',	// superman as attribute
										link: function()	// superman attribute as link
										{
											alert ("it is really working");
										}
									}
						}
			);

app.directive("superman",function()
						{
							return {
										restrict: 'A',	// superman as attribute
										link: function()	// superman attribute as link
										{
											alert ("it is working");
										}
									}
						}
			);
