<template>
	<view class="mine">
		<!-- 头部 -->
		<view class="min-header">
			<view class="min-main">
				<view class="min-config" @tap="toConfig">
					<image src="/static/image/setting.png"  mode=""></image>
				</view>
				<view class="min-logo">
					<image :src="status?userInfo.imgSrc:'/static/image/one.jpeg'" mode=""></image>
					<view>{{status?userInfo.username:'用户昵称'}}</view>
				</view>
			</view>
		</view>
		
		<!-- 订单 -->
		<view class="min-order">
			<view class="order-title" @tap="toOrder">
				<view>我的订单</view>
				<view>全部订单</view>
			</view>
			<view class="order-list">
				<view class="order-item" v-for="(item,index) in 6" :key="index">
					<image src="/static/image/three.jpeg" mode=""></image>
					<view>待付款</view>
				</view>
			</view>
		</view>
		
		<view class="min-content">
			<view class="content-item" v-for="(item,index) in 6" :key="index">
				<view>我的收藏</view>
				<view>></view>
			</view>
		</view>
		
		<TabBar currentPage="mine"></TabBar>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import TabBar from '@/components/common/TabBar.vue'
	export default {
		components:{
			TabBar
		},
		data() {
			return {
				
			}
		},
		computed:{
			...mapState({
				status:state=>state.user.status,
				userInfo:state=>state.user.userInfo
			})
		},
		methods: {
			toConfig(){
				uni.navigateTo({
					url:'../mine-config/mine-config'
				})
			},
			toOrder(){
				uni.navigateTo({
					url:'../mine-order/mine-order'
				})
			},
			login(){
				uni.navigateTo({
					url:'../login/login'
				})
			}
		}
	}
</script>

<style scoped>
.mine{
	width: 100%;
	background-color: #F0F0F0;
	z-index: -1;
	overflow: hidden;
}
.min-header{
	position: relative;
	width: 100%;
	height: 300rpx;
	background: url("/static/image/five.jpeg") no-repeat;
	background-size: cover;
	position: relative;
}
/* .min-main{
	position: relative;
} */
.min-config{
	margin-top:44rpx;
	position: absolute;
	padding:20rpx;
	
}
.min-config image{
	width: 45rpx;
	height: 45rpx;
	border-radius: 50%;
	background-color: #fff;
}
.min-logo{
	position: absolute;
	width: 120rpx;
	height: 100rpx;
	border-radius: 50%;
	left:50%;
	top:40%;
	transform: translate(-50%,-50%);
	font-size: 30rpx;
	color:#fff;
	text-align: center;
}
.min-logo image{
	width: 120rpx;
	height: 120rpx;
	border-radius: 50%;
}

.min-order{
	width: 100%;
	height: 200rpx;
	margin-bottom:20rpx;
	padding:20rpx 0;
	background-color: #fff;
	
}
.order-title{
	display: flex;
	justify-content: space-between;
	padding:20rpx;
}
.order-list{
	width: 100%;
	display: flex;
}
.order-item{
	flex:1;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
}
.order-item image{
	width: 80rpx;
	height: 80rpx;
}
.min-content{
	background-color: #fff;
}
.content-item{
	display: flex;
	justify-content: space-between;
	padding:20rpx 0;
	border-bottom: 1rpx solid #ccc;
}
</style>
