<template>
	<view>
		<view class="config-item" v-for="(item,index) in 8" :key="index" @tap="toAddress">
			<view>地址管理</view>
			<view> > </view>
		</view>
		
		<view class="config-exit" @tap="exit">
			<view>退出</view>
		</view>
	</view>
</template>

<script>
	import {mapMutations} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			...mapMutations(['loginOut']),
			toAddress(){
				uni.navigateTo({
					url:'../mine-address/mine-address'
				})
			},
			exit(){
				uni.showToast({
					title:'退出成功'
				})
				this.loginOut();
				uni.navigateTo({
					url:'../login/login'
				})
			}
		}
	}
</script>

<style scoped>
	.config-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding:10rpx 10rpx;
		
	}
	.config-exit{
		width: 100%;
		text-align: center;
		background-color: #49bdfb;
		line-height: 60rpx;
		color:#fff;
		
	}
</style>
