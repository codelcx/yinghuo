<template>
	<view >
		<Lines></lines>
		<view class="list">
			<!-- 左侧 -->
			<scroll-view :style="'height:'+ viewH" scroll-y="true" class="list-left">
				<view v-for="(item,index) in leftData" :key="index" class="left-item" @tap="changeLeftTap(index,item.id)">
					<view class="left-name" :class="currentLeftIndex===index?'left-name-active':''">{{item.name}}</view>
				</view>
			</scroll-view>
			
			<!-- 右侧侧 -->
			<scroll-view :style="'height:'+ viewH" scroll-y="true"  class="list-right">
				<view class="right-list" v-for="(item1,index) in rightData" :key="index">
					<view class="right-title">{{item1.name}}</view>
					<view class="right-content">
						<view class="right-item" v-for="(item2,index) in item1.list" :key="index">
							<image :src="item2.imgUrl" mode="" class="right-img"></image>
							<view class="right-name">{{item2.name}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		
		<TabBar currentPage="list"></TabBar>
	</view>
</template>

<script>
	import Lines from '@/components/common/Line.vue'
	import TabBar from '@/components/common/TabBar.vue'
	export default {
		components:{
			Lines,
			TabBar
		},
		data() {
			return {
				viewH:0,
				currentLeftIndex:0,
				leftData:[],
				rightData:[]
			}
		},
		onLoad(){
			this.getData(1)
		},
		//获取可视高度赋予scrollview
		onReady(){
			//获取设备高度
			uni.getSystemInfo({
				success:(res)=>{
					this.viewH = res.windowHeight - this.getClientHeight() + 'px';
				}
			})
		},
		//监听输入框点击事件
		onNavigationBarSearchInputClicked(){
			uni.navigateTo({
				url:'../search/search'
			})
		},
		methods: {
			//高度兼容性
			getClientHeight(){
				const phone = uni.getSystemInfoSync();//获取设备信息
				const system = phone.platform;//手机类型
				
				
				if(system == 'ios'){
					return phone.statusBarHeight;
				}else if(system == 'android'){
					return phone.statusBarHeight;
				}else{
					return 0;
				}
			},
			changeLeftTap(index,id){
				this.currentLeftIndex=index;
				this.getData(id)
			},
			getData(id){
				this.$http.request({
					url:"/list_data",
				}).then(res=>{
					let leftData=[];
					res.forEach(item=>{
						leftData.push({
							id:item.id,
							name:item.name
						})	
						this.leftData=leftData;
						if(item.id == (this.currentLeftIndex+1)){
							this.rightData=item.data;
						}
					})
				}).catch(()=>{
					uni.showToast({
						title:'请求失败'
					})
				})
			}
		}
	}
</script>

<style scoped>
	.list{
		display: flex;
	}
	.list-left{
		width: 200rpx;
	}
	.left-name{
		position: relative;
		font-weight: blod;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
	}
	.left-name-active{
		background-color: #fff;
	}
	.left-name-active::before{
		content:'';
		width: 8rpx;
		height: 100%;
		position: absolute;
		top:0;
		left:0;
		background-color: #498df8;
	}
	.left-item{
		border-bottom: 2rpx solid #fff;
		font-size: 20rpx;
		background-color: #f7f7f7;
	}
	
	.list-right{
		flex: 1;
	}
	.right-title{
		font-weight: blod;
		padding:30rpx 0;
	}
	.right-content{
		display: flex;
		flex-wrap: wrap;
	}
	.right-name{
		font-size: 12rpx;
	}
	.right-item{
		width: 150rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding:10rpx;
	}
	.right-img{
		width: 100rpx;
		height: 100rpx;
	}
</style>
