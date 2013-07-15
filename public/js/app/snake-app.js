angular.module('snakeApp', ['ngResource']).
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
    }
  }).
  config(function($routeProvider) {
    $routeProvider.
      when('/', { controller: rootController }).
      otherwise('/');
  }).
  factory('snakeService', function($resource) {
    return $resource('/api/todos');
  });

/*
 상태 목록
  - 기억하다, 생각하다 : collect : 최초 일을 생각하여 기록한 상태, 모든 To do 는 여기서 시작함
  - 실행하다, 하고있다 : work : 일을 하고 있는 상태
  - 중지, 중단, 일시 정지 : hold : 일을 멈춘 상태, 하고 있지 않은 상태, 완료되진 않은 상태. 반드시 work 상태를 지나와야 함
  - 완료, 종료 : clear : 완전히 종료된 상태
*/
var rootController = function($scope, $http, snakeService) { 
  $scope.init = function() { 
    $scope.onToDo = "";
    $scope.inbox = [];
    $scope.snakeService = snakeService.get();
  };

  $scope.searchDateInHistory = function(dateString) {
    for(var i in $scope.history) {
      if($scope.history[i].dateCaption == dateString) return i;
    }

    return -1;
  };

  $scope.enterInbox = function() { 
    var todo = { status: 'collect', title: $scope.onToDo };
    var today = null;

    $scope.inbox.unshift(todo);

    var todayIndex = $scope.searchDateInHistory('7/9');

    if(todayIndex < 0) {
      todayIndex = $scope.history.unshift({ dateCaption: '7/9', todos: [] });
      todayIndex = 0;
    }

    $scope.history[todayIndex].todos.unshift(todo);

    $scope.onToDo = "";
  };

  $scope.init();

}