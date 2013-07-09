angular.module('snakeApp', []).
  directive('ngOnEnter', function() {
    return function(scope, element, attrs) {
      element.bind("keydown keypress", function(event) {
        if(event.which === 13) {
          scope.$apply(function(){
            scope.$eval(attrs.ngOnEnter);
          });

          event.preventDefault();
        }
      });
    };
  });

var rootController = function($scope, $http) { 

  $scope.init = function() { 
    $scope.onToDo = "";
    $scope.inbox = [];
  };

  $scope.enterInbox = function() { 
    $scope.inbox.push({ title: $scope.onToDo });
    $scope.onToDo = "";
  };

  $scope.init();

}