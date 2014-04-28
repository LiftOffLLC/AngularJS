var app=angular.module("myApp",[]);

app.directive("superman",function()
						{
							return {
										restrict: 'E',	// superman as element
										template: "<div>I am here to save you</div>"	// superman element's behavior
									}
						}
			);
