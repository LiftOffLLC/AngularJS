var app=angular.module("myApp",[]);

app.directive("superhero",function()
						  {
							return {
										restrict: 'E',	// superhero attribute as an element
										
										scope:{},	// to provide isolation

										controller: function($scope)
													{
														$scope.abilities=[];

														this.addStrength = function()
																			{
																				$scope.abilities.push("strength");
																			}

														this.addSpeed = function()
																			{
																				$scope.abilities.push("speed");
																			}

														this.addFlight = function()
																			{
																				$scope.abilities.push("flight");
																			}
													},

										link: function(scope, element)	// superman element as link
											  {
											  	element.addClass("button");
												element.bind("mouseenter",function()
																		  {
																			console.log(scope.abilities);
																		  })
											  }
									}
						  }
			 );

app.directive("strength",function()
						  {
							return {
										require: "superhero",	

										link: function(scope, element, attrs, superheroCtrl)	
											  {
											  	element.addClass("panel");
											  	superheroCtrl.addStrength();
											  }
									}
						  }
			 );

app.directive("speed",function()
					  {
						return {
									require: "superhero",	

									link: function(scope, element, attrs, superheroCtrl)	
										  {
										  	element.addClass("panel");
										  	superheroCtrl.addSpeed();
										  }
								}
					  }
			 );

app.directive("flight",function()
					  {
						return {
									require: "superhero",	

									link: function(scope, element, attrs, superheroCtrl)	
										  {
										  	element.addClass("panel");
										  	superheroCtrl.addFlight();
										  }
								}
					  }
			 );
