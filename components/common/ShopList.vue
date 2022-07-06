<template>
	<view class="shop-list">
		<view class="shop-title">
			<view class="shop-item" v-for="(item,index) in shopName" :key="index" 
			@tap="tapClick(index)">
				<view :class="currentIndex==index?'active-color':''">{{item.name}}</view>
				<view>
					<view :class="item.status==1?'active-color':''" class="iconfont icon-shangjiantou"></view>
					<view :class="item.status==2?'active-color':''" class="iconfont icon-downarrow"></view>
				</view>
			</view>
		</view>
		<Lines></Lines>
		<CommodityList :data="data"></CommodityList>
	</view>
</template>

<script>
	import $http from '@/common/api/request.js'
	import CommodityList from '@/components/common/CommodityList.vue'
	import Lines from '@/components/common/Line.vue'
	export default {
		components: {
			Lines,
			CommodityList
		},
		props:{
			keyword:String
		},
		mounted(){
			this.getData();
		},
		computed:{
			orderBy(){
				let obj = this.shopName[this.currentIndex];
				let order = obj.status===1?'asc':'desc';
				return {
					order
				}
			}
		},
		data() {
			return {
				data:[],
				currentIndex:0,
				shopName:[
					{name:'价格',status:1},
					{name:"折扣",status:0},
					{name:"品牌",status:0}]
			}
		},
		methods:{
			getData(){
				$http.request({
					url:'/search/search_good',
					data:{
						title:this.keyword,
						orderName:'nprice',
						...this.orderBy
					}
				}).then(res=>{
					this.data=res;
				})
			},
			tapClick(index){
				let status = this.shopName[index].status;
				this.shopName[index].status = status==0?1:status;
				if(this.currentIndex==index){
					this.shopName[index].status = status==1?2:1;
				}
				this.currentIndex=index;
				this.getData()
			}
		}
	}
</script>

<style scoped>
	.shop-title {
		display: flex;
		margin-bottom: 15rpx;
	}

	.shop-item {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.iconfont {
		height: 20rpx;
		margin-left: 8rpx;
		font-weight: bold;
		color:#ccc;
	}
	.active-color{
		color: blue;
	}
</style>
