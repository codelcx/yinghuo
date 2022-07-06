var express = require('express');
var router = express.Router();

var data = require('../data/index_data')
var sql = require('../db/handler')

//1、推荐
router.get('/api/index_list/1/data/1',(req,res)=>{
	res.send({
		data:data.recommend
	})
})

//推荐分页
router.get('/api/index_list/1/data/:page',(req,res)=>{
	res.send({
		data:{
			commodity:data.recommend.commodity
		}
	})
})

//运动户外
router.get('/api/index_list/2/data/:page',(req,res)=>{
	const params= req.params;
	if(params.page==1){
		res.send({
			data:data.sport
		})
	}else{
		res.send({
			data:{
				shop:data.sport.shop
			}
		})
	}

})

//分页
router.get('/api/list_data',(req,res)=>{
	res.send({
		data:data.list.data
	})
})

//商品搜索
router.get('/api/search/search_good',(req,res)=>{
	let {title,orderName,order} = req.query;
	sql.selectGoodByTitle("%"+title+"%",orderName,order).then(data=>{
		res.send({
			data
		});
	})
})
//商品详情
router.get('/api/detail/:id',(req,res)=>{
		const id= req.params.id;
		sql.selectGoodById(id).then(data=>{
			res.send({
				data
			})
		})
})


//支付宝沙箱
const alipaysdk = require('../sdk/alipay')
const alipayFormData = require('alipay-sdk/lib/form').default;

//支付接口
router.post('/api/alipayment',(req,res)=>{
	try{
		let orderid = Math.ceil(Math.random()*100)
		const formData = new alipayFormData();
		formData.setMethod('get')
		formData.addField('bizContent',{
			outTradeNo:'2022/7/5',//商品订单号
			productCode:'FAST_INSTANT_TRADE_PAY',//固定的
			totalAmount:'10',//订单金额,
			subject:'最新爆款',//商品名称
			body:'夏天不容错过的商品',//商品详情
		})

		//formData.addField('notifyUrl','https://www.baidu.com');//支付成功跳转到项目自定义的接口，需要公网
		formData.addField('returnUrl','https://www.bilibili.com');//支付成功界面

		const result = alipaysdk.exec(
			'alipay.trade.page.pay',//统一收单下单并支付页面接口
			{},//api请求的参数
			{
				formData
			}
		).then(data=>{
			res.send({
				data:{
					code:200,
					paymentUrl:data
				}
			})
		})		
	}catch(err){
		console.log(err);
	}

})

module.exports = router;
