<template>
	<view class="commodity" :style="'flex-wrap:' + wrap">
		<view v-for="(item,index) in dataList" :key="index" class="commodity-item" :style="'width:' + itemW" @tap="toDetail(item.id)">
			<image class="commdity-img" :src="item.imgSrc" mode="" :style="'height:'+ imgH"></image>
			<view class="commodity-content">
				<text class="commodity-title">{{item.title}}</text>
				<view class="commodity-price">
					<text class="old-price">￥{{item.oprice}}</text>
					<text class="new-price">￥{{item.nprice}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			dataList: Array,
			itemW:{
				type:String,
				default:'375rpx'
			},
			imgH:{
				type:String,
				default:'375rpx'
			},
			wrap:{
				type:String,
				default:"wrap"
			}
		},
		methods:{
			toDetail(id){
				uni.navigateTo({
					url:'/pages/detail/detail?id='+id,
				})
			}
		}
	}
</script>

<style scoped>
	.commodity{
		display: flex;	
	}
	.commodity-item{
		display: flex;
		flex-wrap: wrap;
		padding-bottom: 10rpx;
		
	}
	.commdity-img{
		width:100%;
	}
	.commodity-content{
		white-space:nowrap;         
		overflow:hidden;            
		text-overflow:ellipsis;   
	}
	.old-price{
		text-decoration: line-through;
		color:#ccc;
	}
	
</style>