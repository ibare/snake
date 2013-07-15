var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function () {
  app.set('port', process.env.PORT || 4000);
  app.set('views', path.join(__dirname, 'app/view'));
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/', routes.index);

app.get('/api/todos', function(req, res) { 
  res.send({
    history: [
      {
        date: '2013/07/06',
        dateCaption: '7/6',
        todos: [
          { status: 'collect', title: 'iOS 7 앱 만들기' },
          { status: 'collect', title: '회원 관리 기능 개발' }
        ]
      },
      {
        date: '2013/07/05',
        dateCaption: '7/5',
        todos: [
          { status: 'collect', title: 'iOS 7 앱 만들기' },
          { status: 'collect', title: '회원 관리 기능 개발' },
          { status: 'collect', title: '체크리스트 사용자 활동 기능 개발' },
          { status: 'collect', title: '체크리스트 회원별 체크 내용 저장 개발' },
          { status: 'collect', title: '체크리스트 등록 및 수정 화면 개발' },
          { status: 'collect', title: '체크리스트 목록 화면 개발' },
          { status: 'collect', title: '구글 어널리스틱 A/B 테스트 구조 구축' }
        ]
      }
    ] 
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Snake 서버가 ' + app.get('port') + '포트에서 동작합니다.');
});
