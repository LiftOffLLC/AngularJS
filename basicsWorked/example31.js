<html>
  <head>
    <meta charset="utf-8">
    <title>Angular.js Example</title>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.1/angular.min.js"></script>
    <script src="temp.js"></script>
  </head>

  <body>
  <div ng-app="myApp">
    <div ng-controller="FirstCtrl">
      <input type="text" ng-model="data.name"/>
      {{data.name}}  
    </div>
    <div ng-controller="SecondCtrl">
      <input type="text" ng-model="data.name"/>
      {{data.name}}
      <br/>
      {{reverseName(data.name)}}
    </div>
  </div>
  </body>
</html>