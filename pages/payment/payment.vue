<template>
	<view>
		<NavBar title="确认支付" leftText="关闭" fixed="true" @clickLeft="toBack"></NavBar>

		<view class="payment-list">
			<radio-group>
				<view class="payment-item">
					<!-- 单选 -->

					<image src="/static/image/zfb.png" mode=""></image>
					<view class="item-text">
						<view>支付宝支付</view>
						<view class="item-tz">推荐支付宝用户使用</view>
					</view>
					<label class="radio">
						<radio value="" /><text></text>
					</label>
				</view>

				<view class="payment-item">
					<image src="/static/image/wxin.png" mode=""></image>
					<view class="item-text">
						<view>微信支付</view>
						<view class="item-tz">推荐微信用户使用</view>
					</view>
					<label class="radio">
						<radio value="" /><text></text>
					</label>
				</view>
			</radio-group>
		</view>

		<view class="payment-foot">
			<view class="payment-total">
				<text>合计：￥{{total}}</text>
			</view>
			<view class="payment-py" @tap="toPayment">
				<text>去支付</text>
			</view>
		</view>
	</view>
</template>

<script>
	import NavBar from '@/components/uni/uni-nav-bar.vue'
	export default {
		components: {
			NavBar
		},
		data() {
			return {
				total: 0
			}
		},
		onLoad(e) {
			this.total = e.total;
		},
		methods: {
			toBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			toPayment() {
				this.$http.request({
					url:'/alipayment',
					method:'post'
				}).then(res=>{
					console.log(res.paymentUrl);
					//plus.runtime.openURL(res.paymentUrl)
				})
				// uni.navigateTo({
				// 	url: '/pages/payment-success/payment-success'
				// })
			}
		}
	}
</script>

<style scoped>
	.payment-item {
		display: flex;
		justify-content: space-between;
		border-bottom: 2rpx solid #ccc;
		padding: 10rpx 0;
	}

	.payment-item image {
		width: 80rpx;
		height: 80rpx;
		padding: 10rpx 20rpx;
	}

	.item-text {
		flex: 1
	}

	.item-tz {
		font-size: 26rpx;
		color: #ccc;
	}

	.payment-foot {
		width: 100%;
		display: flex;
		line-height: 90rpx;
		color: #fff;
		justify-content: space-between;
		align-items: center;

		position: fixed;
		bottom: 0;
	}

	.payment-total {
		width: 75%;
		background-color: #000;
		padding-left: 20rpx;
	}

	.payment-py {
		width: 25%;
		text-align: center;
		background-color: #49bdfb;
	}
</style>
