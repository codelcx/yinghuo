const sql = require('./sql')
const mysql = require('mysql')
const jwt = require('jsonwebtoken')

const db = mysql.createPool({
    host:'127.0.0.1',//数据库地址
    user:'root',//登录数据库账号
    password:'1234',//登录密码
    database:'mall',//操作的数据库名
})

//封装promise
function sqlPromise(sql,options){
	return new Promise((res,rej)=>{
		if(options){
			db.query(sql,options,(err,data)=>{
				if(err) return rej(err);
				return res(data);
			})
		}else{
			db.query(sql,(err,data)=>{
				if(err) return rej();
				return res(data);
			})
		}

	})

}

//1、插入商品数据处理
exports.insertGood=function(data){
	return sqlPromise(sql.insert_good,data);
}

//搜索所有商品数据
exports.selectAllGood=function(){
	return sqlPromise(sql.select_all_good);
}
//根据ID搜索商品
exports.selectGoodById=function(id){
	return sqlPromise(sql.select_good_by_id,id);
}

//根据title模糊搜索商品
exports.selectGoodByTitle=function(title,orderName,order){
	//return sqlPromise(sql.select_good_by_title,[title,orderName,order]);//此种方式无法对数据排序，未解决
	let nsql = `select * from good where title like '${title}' order by ${orderName} ${order}`;
	return  sqlPromise(nsql)
}

//登录
exports.selectUser =function(username,password,tel){
	return sqlPromise(sql.select_user,[username,password,tel]);
}

//查询用户名用户
exports.selectUserByName =function(username){
	return sqlPromise(sql.select_user_by_username,[username,username]);
}

//根据openId和登录方式查用户
exports.selectUserByMode = function(provider,openId){
	return sqlPromise(sql.select_user_model_openId,[provider,openId])
}


//注册
exports.insertUser = function(params){
	const secretKey = 'secre';//口令
	const token = jwt.sign({tel:params.tel}, secretKey, { expiresIn: '300s',algorithm:'HS256'})
	
	let username = params.tel || params.nickName;
	let password = params.password || '123456';
	let imgSrc = params.avatarUrl || '/static/image/three.jpeg';
	let nickname = params.nickName || "默认昵称";
	let openId = params.openId || " "
	let provider = params.provider || "yinghuo"
	let tel = params.tel || "";
	return sqlPromise(sql.insert_user,[username,password,tel,imgSrc,nickname,token,openId,provider])
}