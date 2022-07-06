var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//路由导入
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


//创建实例
var app = express();

//跨域
// 配置允许跨域请求；
app.all('*', function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Credentials", "true");  
  res.header("Access-Control-Allow-Headers", "X-Requested-With");  
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
  res.header("X-Powered-By",' 3.2.1')  
  res.header("Content-Type", "application/json;charset=utf-8");  
  next();  
});

// 模板设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

//请求体json body数据解析
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

//静态资源配置
app.use(express.static(path.join(__dirname, 'public')));

//自定义返回数据的中间件,一定要在路由前注册
app.use((req,res,next)=>{
	res.result = (code=0,data,msg="ok")=>{
		res.send({
			code,
			data,
			msg,
		})
	}
	next()
})
//路由中间件注册
app.use('/', indexRouter);
app.use('/', usersRouter);

//错误中间件
app.use(function(req, res, next) {
  next(createError(404));
});

//发生错误时的处理
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
