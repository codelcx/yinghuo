<template>
	<view>
		<view class="register-main">
			<view class="register-tel">
				<text>手机号</text>
				<input class="tel" type="number" value="" v-model="tel" focus="true" placeholder="请输入11位手机号" />
			</view>
			<view class="register-foot" @tap="toNextCode">下一步</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tel: '15296598343',
				rules: {
					tel: {
						rule: /^1[23456789]\d{9}$/,
						msg: '请输入正确手机号',
					}
				}
			}
		},
		methods: {
			//验证登录
			validate(key) {
				let flag = this.rules[key].rule.test(this[key]);
				if (!flag) {
					uni.showToast({
						title: this.rules[key].msg
					})
					return flag;
				}
				return flag;
			},

			toNextCode() {
				if (!this.validate('tel')) return;

				this.$http.request({
					url: '/register',
					method: 'post',
					data: {
						tel: this.tel
					}
				}).then(res => {
					// if (!res.success) {
					// 	//手机号未被注册则下一步，为了方便此处直接注册
					// 	//  return uni.navigateTo({
					// 	// 	url: '../login-code/login-code?tel='+this.tel
					// 	// })
						
					// }
					uni.showToast({
						title:res.msg
					})
				})

			}
		}
	}
</script>

<style scoped>
	.register-main {
		position: relative;
		top: 20%;
	}

	.register-tel {
		display: flex;
		padding: 30rpx;
		margin: 40rpx 20rpx;
		border-top: 2rpx solid #ccc;
		border-bottom: 2rpx solid #ccc;
	}

	.register-tel text {
		font-weight: bold;
	}

	.tel {
		flex: 1;
		padding-left: 20rpx;
	}

	.register-foot {
		width: 90%;
		color: #fff;
		background-color: #49bdfb;
		text-align: center;
		font-size: 36rpx;
		font-weight: blod;
		border-radius: 20rpx;
		padding: 10rpx 0;

		margin: 0 auto;

	}
</style>
