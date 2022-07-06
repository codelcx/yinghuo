
<script>
	export default {
		onLaunch: function() {
			this.$store.commit('initUser')
			//console.log('App Launch')
		},
		onShow: function() {
			//console.log('App Show')
			uni.hideTabBar()
		},
		onHide: function() {
			//console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url('/static/iconfont/iconfont.css');
	@import url('common/css/normal.css');
	
	.uni-checkbox-input{
		width: 30rpx!important;
		height: 30rpx!important;
		line-height: 30rpx;
		margin-left:10rpx;
	}
</style>
