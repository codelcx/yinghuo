<template>
	<view class="detail">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in detailData.swiperList" :key="index">
				<view class="swiper-item">
					<image class="swiper-img" :src="item.imgUrl" alt="">
				</view>
			</swiper-item>
		</swiper>
		
		<view class="detail-good">
			<view class="good-name">{{detailData.detailName}}</view>
			<view class="good-price">
				<view class="good-nprice">￥{{detailData.detailNPrice}}</view>
				<view class="good-oprice">￥{{detailData.detailOPrice}}</view>
			</view>

		</view>
		
		<view class="detail-img">
			<view v-for="(item,index) in detailData.detailImg" :key="index">
				<image :src="item" mode=""></image>
			</view>
		</view>
		
		<view class="detail-footer">
			<view class="iconfont icon-xiaoxi"></view>
			<view class="iconfont icon-gouwuche"></view>
			<view class="add-shopcart" @tap="toShopCart">加入购物车</view>
			<view class="buy" @tap="showPop">立即购买</view>
		</view>
		
		<view class="pop" v-show="isShow" @touchmove.stop.prevent="">
			<view class="pop-mask"  @tap="hidePop"></view>
			<view class="pop-box" :animation="animationData">
				<view>
					<image class="pop-img" :src="detailGood.imgSrc" mode=""></image>
				</view>
				<view class="pop-count">
					<view>购买数量</view>
					<UniNumberBox :min="1" :value="count" @change="changeNum"></UniNumberBox>
				</view>
				<view class="pop-btn" @tap="addShopCart">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	import UniNumberBox from '@/components/uni/uni-number-box.vue'
	import {mapMutations} from 'vuex'
	export default {
		components:{
			UniNumberBox
		},
		data() {
			return {
				detailGood:{},
				count:1,
				detailData:{
					id:1,
					detailName:'2021年新款夏天港风复古chic休闲时尚网红炸街衣服短裤两件套装女',
					detailOPrice:300.00,
					detailNPrice:200.00,
					swiperList:[
						{imgUrl:'/static/image/one.jpeg'},
						{imgUrl:'/static/image/one.jpeg'},
						{imgUrl:'/static/image/one.jpeg'},
					],
					detailImg:[
						'/static/image/six.jpeg',
						'/static/image/five.jpeg',
						'/static/image/four.jpeg',
					]					
				},
				isShow:false,
				animationData:{}
		
			}
		},
		//底部弹窗时点击返回键关闭弹窗
		onBackPress(){
			if(this.isShow){
				this.hidePop();
				return true;//必须return true
			}

		},
		onLoad(e){
			this.$http.request({
				url:"/detail/"+e.id,
			}).then(res=>{
				this.detailGood=res[0];
			}).catch(()=>{
				uni.showToast({
					title:'请求失败'
				})
			})
		},
		// //点击分享
		onNavigationBarButtonTap(e){
			if(e.type="share"){
				uni.share({
					provider:"qq",
					scene:"WXSceneSession",
					type:0,
					title:this.detailData.detailName,
					href:'http://127.0.0.1:8080/#/pages/detail/detail?id='+this.detailData.id,
					success:(res)=>{
						uni.showTabBar({
							title:"分享成功"
						})
					},
					fail:(err)=>{
						uni.showTabBar({
							title:"分享失败"
						})
					}
				})
			}
		},
		methods: {
			showPop(){
				// var animation = uni.createAnimation();
				
				// animation.height(300).step();
				// this.animationData=animation.export();
				this.isShow=true;
				// setTimeout(()=>{
				// 	animation.height(200).step();
				// 	this.animationData=animation.export();
				// },1000/60)
					
			},
			hidePop(){
				// var animation = uni.createAnimation();
				// animation.height(0).step();
				// this.animationData=animation.export();
				
				this.isShow=false;
			},
			changeNum(value){
				this.count=value;
			},
			toShopCart(){
				//navigationTo到其他界面
				//switchTab关闭所有界面然后跳转
				//如何判断是否是tabbar页面？
				// uni.switchTab({
				// 	url:'../shopcart/shopcart'
				// })
				
				uni.navigateTo({
					url:'../shopcart/shopcart'
				})
			},
			...mapMutations(['addShopCarts']),
			addShopCart(){
				// let good = this.detailGood;
				// good['count']=this.count;
				// good['isChecked'] = false;				
				
				// this.addShopCarts(good);
				// this.hidePop();
				// uni.showToast({
				// 	title:'加入购物车成功'
				// })
				this.$http.request({
					url:'',
					header:{
						token:true,
					}
				})
			}
		}
	}
</script>

<style scoped>
.detail{
	padding-bottom: 90rpx;
}
::-webkit-scrollbar{
	display: none;
}
.swiper-img{
	width: 100%;
	height: 700rpx;
}
.good-name{
	display:-webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
	text-overflow: ellipsis;
	overflow: hidden;
}
.detail-good{
	padding:10rpx 0;
}
.good-price{
	display: flex;
	align-items: center;
}
.good-nprice{
	margin-right:10rpx;
	font-size: 38rpx;
	color:red;
}
.good-oprice{
	align-self: flex-end;
	text-align: center;
	text-decoration: line-through;
}
.detail-img image{
	width: 100%;
	display: block;
}
.detail-footer{
	position: fixed;
	left:0;
	bottom: 0;
	width: 100%;
	height: 90rpx;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	background-color: #fff;
}
.iconfont{
	width: 60rpx;
	height: 60rpx;
	line-height: 60rpx;
	border-radius: 100%;
	background-color: #000;
	color:#fff;
	text-align: center;
	margin:0 5rpx;
}
.add-shopcart{
	color:#fff;
	background-color: #000;
	border-radius: 40rpx;
	padding: 6rpx 20rpx ;
}
.buy{
	color:#fff;
	background-color: #49bdfe;
	border-radius: 40rpx;
	padding: 6rpx 20rpx ;
}
.pop{
	position: fixed;
	top:0;
	left: 0;
	z-index: 99;
	width: 100%;
	height: 100%;
}
.pop-mask{
	position: absolute;
	left: 0;
	bottom:0;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,.3);
}
.pop-box{
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;

	background-color: #fff;
}
.pop-img{
	width: 260rpx;
	height: 260rpx;
	position: relative;
	left:15rpx;
	top:-30rpx;
}
.pop-count{
	padding: 20rpx;
	display: flex;
	justify-content: space-between;
}
.pop-btn{
	width: 100%;
	line-height: 80rpx;
	background-color: #49bdfe;
	color:#fff;
	text-align: center;
}
</style>
