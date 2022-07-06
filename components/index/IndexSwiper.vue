<template>
	<view>
		<swiper :indicator-dots="true" circular="" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in data" :key="index">
				<view class="swiper-item">
					<image :src="item.imgUrl" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props:{
			data:Array
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	image{
		width: 100%;
		height:400rpx;
	}
</style>
