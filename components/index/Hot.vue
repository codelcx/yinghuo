<template>
	<view class="hot">
		<Commodity :dataList="data" itemW="250rpx" imgH="120px"></Commodity>
	</view>
</template>

<script>
	import Commodity from '@/components/common/Commodity.vue'
	export default{
		components:{
			Commodity
		},
		props:{
			data:Array
		},
	}
</script>

<style>
</style>