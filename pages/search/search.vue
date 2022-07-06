<template>
	<view>
		<lines></lines>
		<view class="search-item">
			<view class="search-title">
				<view>最近搜索</view>
				<view @tap="clearHistory" class="iconfont icon-lajitong">
				</view>
			</view>
			<view class="search-content" v-if="searchData.length>0">
				<view v-for="(item,index) in searchData" :key="index" class="search-name" @tap="toSearch(item)">
					{{item}}
				</view>
			</view>
			<view v-else class="search-no">暂无搜索记录</view>
		</view>
		
		<view class="search-item">
			<view class="search-title">
				<view>热门搜索</view>
			</view>
			<view class="search-content">
				<view v-for="item in 8" :key="item" class="search-name">
					YYY
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Lines from '@/components/common/Line.vue'
	export default {
		components:{
			Lines
		},
		data() {
			return {
				keyword:'',
				searchData:[]
			}
		},
		onLoad(){
			uni.getStorage({
				key:"searchData",
				success:(res)=>{
					this.searchData = JSON.parse(res.data)
				}
			})
		},
		//点击搜索
		onNavigationBarButtonTap(e){
			this.search()
		},
		//监听输入框输入
		onNavigationBarSearchInputChanged(e){
			this.keyword= e.text;
		},
		//键盘搜索
		onNavigationBarSearchInputConfirmed(){
			this.search()
		},
		
		methods: {
			search(){
				if(this.keyword===''){
					return uni.showToast({
						title:'关键词不能为空',
						icon:'none'
					})
				}else{
					this.toSearch(this.keyword)
				}
				//隐藏软键盘
				uni.hideKeyboard();
				this.addSearchData()
				
			},
			addSearchData(){
				//最新搜索词排在前，重复搜索关键词不添加
				let idx = this.searchData.indexOf(this.keyword);
				if(idx >= 0) this.searchData.splice(idx,1);
				this.searchData.unshift((this.keyword));
				
				//本地存储搜索词
				uni.setStorage({
					key:"searchData",
					data:JSON.stringify(this.searchData)
				})
			},
			//清除搜索记录
			clearHistory(){
				uni.showModal({
					title:'重要提示',
					content:'是否要清除记录',
					cancelText:'取消',
					confirmText:'确定',
					success:(res)=>{
						if(res.confirm){
							uni.removeStorage({
								key:'searchData'
							})
							this.searchData=[]
						}
					}
				})
			},
			//点击搜索或者最近搜索进行跳转
			toSearch(keyword){
				uni.navigateTo({
					url:'../search-list/search-list?keyword='+keyword
				})
			}
		}
	} 
</script>

<style scoped>
	.search-item{
		padding: 20rpx 0;
	}
	.search-title{
		display: flex;
		justify-content: space-between;
		margin: 0 5rpx;
		
	}
	.search-content{
		display: flex;
		flex-wrap: wrap;
		padding:0 5%;
		
	}
	.search-name{
		width: 15%;
		background-color: #e1e1e1;
		display: inline-block;
		padding: 4rpx 24rpx;
		margin: 10rpx 5rpx;
		border-radius: 50rpx;
		text-align: center;
	}
	.search-no{
		text-align: center;
	}
	.iconfont{
		font-size: 40rpx;
		margin-right:10rpx;
	}
</style>
