<template>
	<view class="Banner">
		<image :src="data" mode=""></image>
	</view>
</template>

<script>
	export default{
		props:['data']
	}
</script>

<style>
	image{
		width: 100%;
		height: 400rpx;
	}
</style>