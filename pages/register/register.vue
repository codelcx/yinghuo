<template>
	<view class="register">
		<view class="register-header" @tap="toLogin">
			<image src="/static/image/close.png" mode=""></image>
		</view>
		
		<view class="register-main">
			<view class="username">
				<text>账号</text>
				<input class="uname" type="text" value="" v-model="username" placeholder="请输入手机号/昵称" />
			</view>
			
			<view class="pwd">
				<text>密码</text>
				<input class="upwd" type="password" value="" v-model="password" placeholder="6-16位字符" />
			</view>
			
			<view class="main-foot">
				<text>忘记密码</text>
				<text>免密登录</text>
			</view>
			
			<view class="register-foot" @tap="login">登录</view>
		</view>
		
	</view>
</template>

<script>
	import {mapMutations} from 'vuex'
	export default {
		data() {
			return {
				username:'用户昵称',
				password:'123456',
				rules:{
					username:{
						rule:/\S/,
						msg:'账号不能空'
					},
					password:{
						rule:/^[0-9a-zA-Z]{6,16}$/,
						msg:'密码应为6-16位字符'
					}
				}
			}
		},

		methods: {
			...mapMutations(['loginSuccess']),
			toLogin(){
				uni.navigateTo({
					url:'../login/login'
				})
			},
			login(){
				if(!this.validate('username') || !this.validate('password')) return;
				this.$http.request({
					url:"/login",
					method:'post',
					data:{
						username:this.username,
						password:this.password
					}
				}).then(res=>{
					this.loginSuccess(res);
					
					uni.navigateTo({
						url:'../mine/mine'
					})
				}).catch(()=>{
					uni.showToast({
						title:'登录失败'
					})
				})
			},
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
			}
		}
	}
</script>

<style scoped>
.register{
	height: 100vh;
}
.register-main{
	position: relative;
	top:20%;
}
.register-header image{
	margin-top:44rpx;
	width: 60rpx;
	height: 60rpx;
}
.username,.pwd{
	display: flex;
	padding:10rpx;
	margin:0 10rpx;
	border-bottom: 2rpx solid #ccc;
}
.uname,.upwd{
	flex: 1;
	padding-left:20rpx;
}
.main-foot{
	display: flex;
	justify-content: space-between;
	padding:16rpx 10rpx 40rpx;
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
