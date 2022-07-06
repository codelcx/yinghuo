<template>
	<view>
		<view class="register-main">
			<view class="register-tel">
				<text>验证码</text>
				<input class="tel" type="number" value="" v-model="code" focus="true" placeholder="请输入验证码" />
				<button plain="true" size="mini" :disabled="disable" @tap="sendCode">{{codeMsg}}</button>
			</view>
			<view class="register-foot" @tap="toNextCode">下一步</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tel:'',
				code:'',
				codeNum:60,
				codeMsg:'',
				disable:false,
				rules:{
					tel:{
						rule:/^1[23456789]\d{9}$/,
						msg:'请输入正确手机号',
					}
				}
			}
		},
		onLoad(e){
			this.tel = e.tel;
			console.log(this.tel);
		},
		onReady(){
			this.codeMsg = '重新发送('+this.codeNum+')';
			this.sendCode()
		},
		methods: {
			//验证登录
			validate(key){
				let flag = this.rules[key].rule.test(this[key]);
				if(!flag){
					uni.showToast({
						title:this.rules[key].msg
					})
					return flag;
				}
				return flag;
			},
				
			sendCode(){
				this.disable=true;
				let timer =setInterval(()=>{
					--this.codeNum;
					this.codeMsg = '重新发送('+this.codeNum+')';
				},1000)
				
				setTimeout(()=>{
					clearInterval(timer);
					this.codeNum=60;
					this.disable=false;
					this.codeMsg = "重新发送";
				},60*1000)
			},
				
			toNextCode(){
				
			}
		}
	}
</script>

<style scoped>
.register-main{
	position: relative;
	top:20%;
}

.register-tel{
	display: flex;
	padding:30rpx;
	margin:40rpx 20rpx;
	border-top: 2rpx solid #ccc;
	border-bottom: 2rpx solid #ccc;
}
.register-tel text{
	font-weight: bold;
}
.tel{
	flex: 1;
	padding-left:20rpx;
}

.register-foot{
	width: 90%;
	color:#fff;
	background-color: #49bdfb;
	text-align: center;
	font-size: 36rpx;
	font-weight: blod;
	border-radius: 20rpx;
	padding:10rpx 0;
	
	margin: 0 auto;
	
}
</style>
