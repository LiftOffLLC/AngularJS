var app=angular.module("myApp",[]);

app.directive("superman",function()
						{
							return {
										restrict: 'C',	// superman as attribute
										link: function()	// superman attribute as link
										{
											alert ("it is working");
										}
									}
						}
			);
