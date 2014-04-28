var app=angular.module("myApp",[]);

app.directive("enter",function()
						{
							return function(scope, element, attrs)
									{
										element.bind("mouseenter",function()
																	{
																		element.addClass(attrs.enter);
																	}) 
									}
						}
			);

app.directive("exit",function()
						{
							return function(scope, element, attrs)
									{
										element.bind("mouseleave",function()
																	{
																		element.removeClass(attrs.exit);
																	}) 
									}
						}
			);
