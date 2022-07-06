<template>
	<view class="card">
		<view>-</view>
		<view><slot>{{cardTitle}}</slot></view>
		<view>-</view>
	</view>
</template>

<script>
	export default{
		props:{
			cardTitle:String
		}
	}
</script>

<style scoped>
	.card{
		padding:20rpx 0;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: bold;
	}
</style>