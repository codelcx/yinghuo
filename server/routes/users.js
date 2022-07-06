var express = require('express');
var router = express.Router();

var sql = require('../db/handler')

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});


//登录
router.post('/api/login', (req, res) => {
	let {
		username,
		password
	} = req.body;
	sql.selectUserByName(username).then(data => {
		if (data.length > 0) {
			sql.selectUser(username, password, '182').then(data => {
				if (data.length > 0) {
					res.send({
						data: data[0],
						success: true,
						msg: '登录成功'
					})
				} else {
					res.send({
						success: false,
						msg: '密码不正确'
					})
				}
			})
		} else {
			res.send({
				success: false,
				msg: '用户名或密码不正确'
			})
		}
	})

})

//验证手机号是否存在
router.post('/api/register', (req, res) => {
	let params = {tel:req.body.tel}
	sql.selectUserByName(req.body.tel).then(data => {
		if (data.length > 0) {
			res.send({
				data: {
					success: true,
					msg: '该手机号已被注册'
				}
			})
		} else {
			sql.insertUser(params).then(data => {
				res.send({
					data: {
						success: false,
						msg: '注册成功',
					}
				})
			})

		}
	})
})

//第三方登录
router.post('/api/loginother', (req, res) => {
	let params = {
		provider,//登录方式
		openId,//用户唯一标识
		nickName,//用户昵称
		avatarUrl,//用户头像
	} = req.body;
	
	//查询是否被注册
	sql.selectUserByMode(params.provider,params.openId).then(data=>{
		//已被注册
		if(data.length>0) {
			res.send({
				data:{
					data: data[0],
					success: true,
					msg: '快捷登录'
				}
			})
		}else{
			//注册
			sql.insertUser(params).then(data=>{
				sql.selectUserByMode(params.provider,params.openId).then(data=>{
					if(data.length>0) {
						res.send({
							data:{
								data: data[0],
								success: true,
								msg: '第三方登录'								
							}
						})
					}
				})
			})
		}
	})
	
})

module.exports = router;
