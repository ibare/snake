angular.module('snakeApp', []).
  directive('ngResize', function() { 
    return function(scope, element, attrs) {
      element.bind("onresize", function(event) {
        scope.$apply(function() {
          scope.$eval(attrs.ngResize);
        });

        event.preventDefault();
      });
    };
  }).
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

/*
 상태 목록
  - 기억하다, 생각하다 : collect : 최초 일을 생각하여 기록한 상태, 모든 To do 는 여기서 시작함
  - 실행하다, 하고있다 : work : 일을 하고 있는 상태
  - 중지, 중단, 일시 정지 : hold : 일을 멈춘 상태, 하고 있지 않은 상태, 완료되진 않은 상태. 반드시 work 상태를 지나와야 함
  - 완료, 종료 : clear : 완전히 종료된 상태
*/
var rootController = function($scope, $http) { 
  $(window).resize(function() {
    console.log($(window).height(), $(document).height());
    //$('#stage').css('height', $(document).height());
  });

  $scope.onChangeSize = function() {
    var historyPos = $('.history').position();

    console.log(historyPos.left, hostoryPos.top);
  };

  $scope.initSVG = function() { 
    var inboxPos = $('.inbox').position();
    var historyPos = $('.history').position();

    $scope.paper = Raphael("stage", 10, 10);
    console.log($('body').height());
    $('#stage').css('left', 0).css('top', 0).css('width', '90%').css('height', $('document').height());
    console.log($('body').height());
  };

  $scope.init = function() { 
    $scope.onToDo = "";
    $scope.inbox = [];
    $scope.history = [];

    // 테스트용 코드
    $scope.history.push({ dateCaption: '7/8', todos: [] });
    $scope.history[0].todos.push({ status: 'collect', title: 'iOS 7 앱 만들기' });
    $scope.history[0].todos.push({ status: 'collect', title: '회원 관리 기능 개발' });
    $scope.history[0].todos.push({ status: 'collect', title: '체크리스트 사용자 활동 기능 개발' });
    $scope.history[0].todos.push({ status: 'collect', title: '체크리스트 회원별 체크 내용 저장 개발' });
    $scope.history[0].todos.push({ status: 'collect', title: '체크리스트 등록 및 수정 화면 개발' });
    $scope.history[0].todos.push({ status: 'collect', title: '체크리스트 목록 화면 개발' });
    $scope.history[0].todos.push({ status: 'collect', title: '구글 어널리스틱 A/B 테스트 구조 구축' });

    $scope.initSVG();
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

    $('#stage').css('height', $(document).height());
  };

  $scope.init();

}