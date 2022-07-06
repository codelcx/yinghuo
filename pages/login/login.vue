<template>
	<view class="login">
		<view class="login-header">
			<image @tap="close" src="/static/image/close.png" mode=""></image>
			<image src="/static/image/set.png" mode=""></image>
		</view>
		
		<view class="login-main">
			<image src="/static/image/three.jpeg" mode=""></image>
			<view class="login-btn" @tap="toLoginTel">手机号注册</view>
			<text class="login-text" @tap="register">已有帐号，去登陆</text>
		</view>
		
		<view class="login-footer">
			<view class="login-item">
				
				<image src="/static/image/wbo.png" mode="" @tap="loginOther('wbo')"></image>
				<image src="/static/image/wxin.png" mode=""  @tap="loginOther('wxin')"></image>
				<image src="/static/image/qq.png" mode=""  @tap="loginOther('qq')"></image>
			</view>
			
			<view class="login-policy">
				<label>
					<checkbox value="" class="checkbox"/>
					<text>登录注册即表示统一用户协议、隐私条款和中国移动认证服务条款</text>
				</label>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapMutations} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			...mapMutations(['loginSuccess']),
			register(){
				uni.navigateTo({
					url:'../register/register'
				})
			},
			toLoginTel(){
				uni.navigateTo({
					url:'../login-tel/login-tel'
				})
			},
			close(){
				uni.navigateTo({
					url:'../index/index'
				})
			},
			loginOther(mode){
				uni.login({
					provider:mode,
					success:(res)=>{
						console.log('success1');
						uni.getUserInfo({
							provider:mode,
							success:(res)=>{
								console.log('success2');
								let provider = mode;
								let openId = res.userInfo.openId;
								let nickName = res.userInfo.nickName;
								let avatarUrl = res.userInfo.avatarUrl;
								this.$http.request({
									url:'/loginother',
									method:'post',
									data:{
										provider,
										openId,
										nickName,
										avatarUrl
									}
								}).then(res=>{
									if(res.success){
										this.loginSuccess(res.data);
										uni.showToast({
											title:res.msg
										})
										uni.navigateTo({
											url:'../index/index'
										})
									}
								}).cath(()=>{
									uni.showToast({
										title:'登录异常'
									})
								})
							}
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
.login{
	width: 100%;
	height:90vh;
}
.login-header{
	margin-top:44rpx;
	display: flex;
	justify-content: space-between;
}
.login-header image{
	width: 60rpx;
	height: 60rpx;
}
.login-main{
	width: 100%;
	height: 50%;
	
	position: relative;
}
.login-main image{
	width: 200rpx;
	height: 200rpx;
	border-radius: 50%;
	position: relative;
	left:50%;
	top:20%;
	transform: translate(-50%);
}
.login-btn{
	width: 90%;
	color:#fff;
	background-color: #49bdfb;
	text-align: center;
	font-size: 36rpx;
	font-weight: blod;
	border-radius: 30rpx;
	padding:10rpx 0;
	
	position: absolute;
	left:50%;
	transform: translate(-50%);
	bottom:0;
}
.login-text{
	position: absolute;
	right:40rpx;
	bottom:-52rpx;
	
	color:#ccc;
}
.login-footer image{
	width: 80rpx;
	height: 80rpx;
	text-align: center;
}
.login-footer{
	height: 50%;
}

.login-item{
	display: flex;
	width: 100%;
	height: 90%;
	justify-content: center;
	align-items: flex-end;

}
.login-item image{
	padding:20rpx;
}
.login-policy{
	text-align: center;
	font-size: 20rpx;;
}

</style>
