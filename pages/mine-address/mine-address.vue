<template>
	<view>
		<view class="address-list">
			<view class="address-item" v-for="(item,index) in list" :key="index" @tap="editAddress(index)">
				<view @tap="toOrder(item)">
					<view class="address-info">
						<view class="address-name">{{item.name}}</view>
						<view>{{item.tel}}</view>
					</view>
					<view class="address-main">
						<view class="address-active" v-if="item.isDefault">默认</view>
						<view>{{item.detail}}</view>
					</view>					
				</view>

			</view>
		</view>
		
		<view class="address-add" @tap="toAddAdress">新增地址</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				confirmOrder:false
			}
		},
		computed:{
			...mapState({
				list:state=>state.address.list
			})
		},
		onLoad(e){
			if(e.type == "confirmOrder"){
				this.confirmOrder = true;
			}
		},
		methods: {
			toAddAdress(){
				uni.navigateTo({
					url:'../add-address/add-address'
				})
			},
			editAddress(index){
				 let address = JSON.stringify({
					 index,
					 item:this.list[index]
				 })
				 
				 uni.navigateTo({
				 	url:'/pages/add-address/add-address?data='+address
				 })
			},
			toOrder(item){
				if(this.confirmOrder){
					//监听自定义事件
					uni.$emit('confirm',item);
					uni.navigateBack({
						delta:1
					})
				}
			}
		}
	}
</script>

<style scoped>

.address-add{
	width: 30%;
	color: #49bdfb;
	text-align: center;
	border-radius: 40rpx;
	padding:6rpx 8rpx;
	border:2rpx solid #49bdfb;
	margin-top:20rpx;
	
	position: relative;
	left:50%;
	transform: translate(-50%);
}

.address-item{
	padding: 6rpx 20rpx;
	border-bottom: 1rpx solid #49bdfb;
}

.address-info{
	display: flex;
}
.address-active{
	background-color: #49bdfb;
	border-radius: 8rpx;
	color:#fff;
	padding:2rpx 4rpx;
	
}
.address-main{
	display: flex;
}
.address-name{
	padding-right:10rpx
}
</style>
