var app=angular.module("myApp",[]);

app.directive("enter",function()
						{
							return function(scope, element)
									{
										element.bind("mouseenter",function()
																	{
																		element.addClass("panel");
																	}) 
									}
						}
			);

app.directive("exit",function()
						{
							return function(scope, element)
									{
										element.bind("mouseleave",function()
																	{
																		element.removeClass("panel");
																	}) 
									}
						}
			);
