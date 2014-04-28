var app=angular.module("myApp",[]);

app.directive("enter",function()
						{
							return function(scope, element)
									{
										element.bind("mouseenter",function()
																	{
																		alert("I am ON the text");
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
																		alert("I am OFF the text");
																	}) 
									}
						}
			);
