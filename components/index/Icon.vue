<template>
	<view class="icon">
		<view class="icon-item" v-for="(item,index) in data" :key="index">
			<image class="icon-img" :src="item.imgUrl" mode=""></image>
			<text class="icon-text">{{item.text}}</text>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			data:Array
		}
	}
</script>

<style scoped>
	.icon{
		width:750rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		align-items: center;
		
	}
	.icon-item{
		width: 25%;
		padding: 10rpx 0;
		overflow: hidden;
		
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		
	}
	.icon-img{
		display: block;
		width: 80rpx;
		height: 80rpx;
		
	}

</style>