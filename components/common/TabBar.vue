<template>
	<view class="tabbar">
		<view class="tab" 
		v-for="(item,index) in tabBarList" :key="index"
		@tap="navigatorTo(item.pagePath,index)"
		>
			<image v-if="currentPage===item.pagePath" :src="item.selectedIconPath" mode=""></image>
			<image  v-else :src="item.iconPath" mode=""></image>
			<view class="text">{{item.text}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			currentPage:{
				type:String,
				default:'index'
			}
		},
		data() {
			return {
				tabBarList: [{
						"pagePath": "index",
						"iconPath": "/static/image/home.png",
						"selectedIconPath": "/static/image/home_select.png",
						"text": "首页"
					}, {
						"pagePath": "list",
						"iconPath": "/static/image/list.png",
						"selectedIconPath": "/static/image/list_select.png",
						"text": "分类"
					},
					{
						"pagePath": "shopcart",
						"iconPath": "/static/image/shopcart.png",
						"selectedIconPath": "/static/image/shopcart_select.png",
						"text": "购物车"
					},
					{
						"pagePath": "mine",
						"iconPath": "/static/image/mine.png",
						"selectedIconPath": "/static/image/mine_select.png",
						"text": "我的"
					}
				]
			}
		},
		methods:{
			navigatorTo(pagePath,index){
				let pages = getCurrentPages();//获取加载页面
				let currentPage = pages[pages.length-1];//获取当前加载页面
				let url = currentPage.route;//获取当前页面URL
				console.log(url);
				if(pagePath=='shopcart' || pagePath=='mine'){
					//登录拦截 mian.js
					this.navTo({
						url:pagePath
					})
				}else{
					uni.redirectTo({
						url:`../../pages/${pagePath}/${pagePath}`
					})
				}
			},
			//解决自定义tabbar底部点击闪烁现象
			resolveTab(pagePath){
				let pages = getCurrentPages();//获取加载页面
				let currentPage = pages[pages.length-1];//获取当前加载页面
				let url = currentPage.route;//获取当前页面URL
				let path = `pages/${pagePath}/${pagePath}`;
				console.log(path);
				if(path!=url){
					console.log(url);
					uni.switchTab({
						url:`/pages/mine/mine`
					})
				}
			}
		}
	}
</script>

<style scoed>
	.tabbar {
		display: none;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 120rpx;
		border-top: 2rpx solid #49bdfb;
		background-color: #fff;

		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.tab {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	image{
		width: 40rpx;
		height: 40rpx;
	}
	.text{
		font-size: 24rpx;
	}
</style>
