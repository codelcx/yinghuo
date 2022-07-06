<template>
	<view class="commodity-list">
		<Commodity :dataList="data"></Commodity>
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
		}
	}
</script>

<style scoped>
	.commodity-list{
		display: flex;
		flex-wrap: wrap;
	}
</style>