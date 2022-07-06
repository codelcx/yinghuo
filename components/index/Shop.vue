<template>
	<view>
	<scroll-view scroll-x="true" class="scroll-content">
		<view class="scroll-item">
			<Commodity :dataList="data" itemW="200rpx" imgH="200rpx" wrap="no-wrap"></Commodity>
		</view>
	</scroll-view>		
	</view>

</template>

<script>
	import Commodity from '@/components/common/Commodity.vue'
	export default{
		components: { 
			Commodity
		},
		props:{
			data:Array
		}
	}
</script>

<style scoped>
	.scroll-content{
		padding:20rpx 0;
		width: 100%;
	}
	.scroll-item{
		display: inline-block;
	}
</style>