<template>
	<view class="recommend">
		<view class="recommend-item" v-for="(item1,index1) in data" :key="index1">
			<image class="big-img" :src="item1.bigUrl" mode=""></image>
			<view class="item-small">
				<image v-for="(item2,index2) in item1.data" :key="index2" class="small-img" :src="item2.smallUrl" mode=""></image>	
			</view>
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

<style scoped >
.recommend {
	display: flex;
	flex-direction: column;
	padding: 10rpx;
	
}
.recommend-item{
	margin: 10rpx 0;
}
.item-small {
	display: flex;
}

image {
	display: block;
}
.big-img {
	width: 100%;
	height: 300rpx;
}
.small-img {
	height: 200rpx;
}
</style>
