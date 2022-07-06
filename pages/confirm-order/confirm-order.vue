<template>
	<view class="confirm-order">
		<view class="order-header" @tap="toAddress">
			<template v-if="address">
				<view class="order-title">
					<view class="order-name">收件人: {{address.name}}</view>
					<view>{{address.tel}}</view>
				</view>
				<view>收货地址:{{address.detail}}</view>
			</template>
			<template v-else>
				<view class="select-address">请选择地址</view>
			</template>

		</view>

		<view class="order-good" v-for="(order,index) in orderList" :key="index">
			<view class="good-status">
				<view>moumu旗舰店</view>
			</view>
			<view class="good-content">
				<image class="good-img" :src="order.imgSrc" mode=""></image>
				<view class="good-text">
					<view class="good-name">{{order.name}}</view>
					<view class="good-list">{{order.type}}</view>
					<view class="good-type">{{order.policy}}</view>
				</view>
				<view class="good-foot">
					<view class="good-price">￥{{order.price}}</view>
					<view class="good-count">x{{order.count}}</view>
				</view>
			</view>
			<view class="order-tip">
				<text>运费</text>
				<text>{{orderTip(order)}}</text>
			</view>
			<view class="good-total">
				<view>共件商品小计: ￥{{orderTotal(order)}}</view>
			</view>
		</view>

		<view class="order-foot">
			<view class="order-total">
				合计：￥{{orderListTotal}}
			</view>
			<view class="order-btn" @tap="submitOrder">
				提交订单
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				address: '',
				total: 0,
				orderList: []
			}
		},
		computed: {
			...mapGetters(['defaultAddress']),
			orderTip() {
				return (item) => {
					let orderTip = Math.floor(item.count / 10);
					return orderTip;
				}
			},
			orderTotal() {
				return item => {
					let ordertotal = item.count * item.price + this.orderTip(item);
					return ordertotal;
				}
			},
			orderListTotal() {
				let total = 0;
				this.orderList.forEach(item => {
					total += this.orderTotal(item)
				})
				return total;
			}

		},
		onLoad(e) {
			//订单商品
			let shoplist = JSON.parse(e.list);
			this.orderList=shoplist;
			//是否存在默认地址
			if (this.defaultAddress.length > 0) {
				this.address = this.defaultAddress[0];
			}
			//是否已经选择好地址，自定义事件触发
			uni.$on('confirm', res => {
				this.address = res;
			})
		},
		onUnload() {
			this.$off('confirm', () => {})
		},
		methods: {
			toAddress() {
				uni.navigateTo({
					url: '../mine-address/mine-address?type=' + 'confirmOrder',
				})
			},
			submitOrder() {
				//判断是选择地址
				if(this.defaultAddress.length==0){
					return uni.showToast({
						title:'请选择地址'
					})
				}
				//发送请求，生成订单号
				
				
				
				uni.navigateTo({
					url: '../payment/payment?total=' + this.orderListTotal
				})
			}
		}
	}
</script>

<style scoped>
	.confirm-order {
		width: 100%;
		height: 100vh;
		background-color: #f7f7f7;
	}

	.order-header {
		border-bottom: 2rpx solid #ccc;
		margin-bottom: 20rpx;
		;
		background-color: #fff;
	}

	.order-title {
		display: flex;
		justify-content: space-between;
	}

	.order-name {
		font-weight: bold;
		padding: 10rpx 8rpx;
	}

	.good-status {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10rpx 8rpx;
		background-color: #fff;
	}

	.good-active-color {
		color: #49bdfb
	}

	.good-content {
		display: flex;
		background-color: #f7f7f7;
		margin-bottom: 2rpx;
	}

	.good-list {
		color: #ccc;
		font-size: 26rpx;
	}

	.good-type {
		color: #49bdfb;
		font-size: 24rpx;
	}

	.good-foot {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		padding-right: 10rpx;
	}

	.good-img {
		width: 200rpx;
		height: 180rpx;
	}

	.good-name {
		font-size: 30rpx;
		;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.good-total {
		display: flex;
		justify-content: flex-end;
		padding: 20rpx 0;
		background-color: #fff;
	}

	.good-btn {
		float: right;
		text-align: right;
		color: #49bdfb;
		border: 2rpx solid #49bdfb;
		border-radius: 10rpx;
		padding: 4rpx 10rpx;
		margin: 0 20rpx 20rpx 0;
	}

	.order-tip {
		display: flex;
		justify-content: space-between;
	}

	.select-address {
		padding: 20rpx;
	}

	.order-foot {
		display: flex;
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		justify-content: flex-end;
		position: fixed;
		bottom: 0;
		background-color: #fff;

	}

	.order-btn {
		color: #fff;
		background-color: #49bdfb;
		margin-left: 20rpx;
	}
</style>
