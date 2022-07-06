<template>
	<view class="index">
		<!-- app与小程序的兼容性 -->
		
		<!-- #ifdef APP-PLUS -->
<!-- 		<view class="wx-nav">
			<view class="iconfont icon-Magnifier"></view>
			<view class="iconfont icon-xiaoxi"></view>
		</view>		 -->
		<!-- #endif -->
		
		
		<!-- 顶部导航栏 -->
		<scroll-view scroll-x="true" class="scroll-content" :scroll-into-view="scollIndex">
			<!-- key需要绑定具体的值，直接绑定item会有警告【object object】。除非item是字符串或者数字 -->
			<view :id="'top' + index" class="scroll-item" v-for="(item,index) in topBar" :key="item.id"  @tap="topBarClick(index)">
				<text :class="topBarIndex === index ? 'active-color': ''">{{item.name}}</text>
			</view>
		</scroll-view>
		
		<!-- 导航栏对应的内容 -->
		<swiper @change="onChangeTab" :current="topBarIndex" :style="'height:'+ viewH">
			<swiper-item v-for="(item,index) in allData" :key="index" >
				
				<scroll-view scroll-y="true" :style="'height:'+ viewH" @scrolltolower="loadMore(index)">
				<!-- 推荐 -->
					<template v-if="item.type === 'recommendList'">
						<IndexSwiper :data="item.indexSwiper"></IndexSwiper>
						<Recommend :data="item.recommend"></Recommend>
						<Card cardTitle="猜你喜欢"></Card>
						<CommodityList :data="item.commodity"></CommodityList>
					</template>	
					
					
					<!-- 运动户外 -->
					<template v-else-if="item.type ==='sportList'">
						<Banner :data="item.banner"></Banner>
						<Icon :data="item.icon"></Icon>
						<Card cardTitle="热销爆款"></Card>
						<Hot :data="item.hot"></Hot>
						<Card cardTitle="店铺推荐"></Card>
						<Shop :data="item.shop"></Shop>
						<CommodityList :data="item.shop"></CommodityList>
					</template>
						
					<template v-else>
						暂无数据...
					</template>
					
					<view class="load-text">
						{{item.loadText}}
					</view>					
				</scroll-view>
			</swiper-item>
		</swiper>
		
		<TabBar currentPage="index"></TabBar>
	</view>

</template>

<script>
	import $http from '@/common/api/request.js'
	import IndexSwiper from '@/components/index/IndexSwiper.vue'
	import CommodityList from '@/components/common/CommodityList.vue'
	import Recommend from '@/components/index/Recommend.vue'
	import Card from '@/components/common/Card.vue'
	import Banner from '@/components/index/Banner.vue'
	import Icon from '@/components/index/Icon.vue'
	import Hot from '@/components/index/Hot.vue'
	import Shop from '@/components/index/Shop.vue'
	import TabBar from '@/components/common/TabBar.vue'
	
	export default {
		components: {
			IndexSwiper,
			CommodityList,
			Recommend,
			Card,
			Banner,
			Icon,
			Hot,
			Shop,
			TabBar
		},

		data() {
			return {
				topBar:[],
				indexSwiper:[],
				recommend:[],
				commodity:[],
				topBarIndex:0,//导航栏的index
				scollIndex:'top0',//滑动时滚动到该元素
				viewH: 0,//渲染的高度，
				allData:[],//所有数据
				loadText:"上拉加载更多"
			}
		},
		onLoad(){
			this.init()
		},
		onReady(){
			//动态数据时以下方式无法获取高度
			// const view = uni.createSelectorQuery().select('.home-data')
			// view.boundingClientRect(data => {
			//   this.viewH = data.height + 'px';//别忘了加单位并且是px
			// }).exec();
			
			//获取设备高度
			uni.getSystemInfo({
				success:(res)=>{
					this.viewH = res.windowHeight - uni.upx2px(80) - this.getClientHeight() + 'px';
				}
			})
		},
		onNavigationBarButtonTap(e){
			if(e.index==0){
				uni.navigateTo({
					url:'../search/search'
				})
			}
		},
		methods: {
			//首次请求
			init(){
				$http.request({
					url:"/index_list/1/data/1",
				}).then(res=>{
					this.topBar=res.topBar;
					this.allData = this.initData(res);
				}).catch(()=>{
					uni.showToast({
						title:'请求失败'
					})
				})
				// uni.request({
				// 	url:"http://127.0.0.1:3000/api/index_list/1/data/1",
				// 	success:(res) => {
				// 		let data = res.data.data;
				// 		this.topBar=data.topBar;
				// 		// this.indexSwiper = data.indexSwiper;
				// 		// this.recommend = data.recommend;
				// 		// this.commodity = data.commodity;
				// 		this.allData = this.initData(data);
				// 	}
				// })
			},
			//点击导航栏时
			topBarClick(index){
				this.topBarIndex = index ;
				this.scollIndex = 'top'+ index;
				//console.log(index,this.allData[index].load);
				if(this.allData[index].load ==="first"){
					this.addData(index);
				}

			},
			//滑动时
			onChangeTab(e){
				this.topBarClick(e.detail.current);
			},
			
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
			//初始化数据
			initData(data){
				let arr = []
				for(let i=0;i<this.topBar.length;i++){
					let obj ={}
					if(i==0) {
						obj=data;
						obj['load']="last";
						obj['loadText'] = '上拉加载更多';
					}else{
						obj['load']="first";
					}
					obj['page'] =1;
					arr.push(obj);
				}

				return arr;
			},
			//根据导航栏请求数据
			addData(page=1){
				let index = this.topBarIndex;
				let id = this.topBar[index].id;
				$http.request({
					url:"/index_list/"+id+"/data/" + page,
				}).then(data=>{
					//首次加载数据时
					if(this.allData[index].load === "first"){
						data['load'] = "last";
						data['page'] = 1;
						data['loadText'] = "上拉加载更多"
						this.allData.splice(index,1,data);//对数组元素直接赋值无法做到响应式
					}else{
						let obj = this.allData[index];
						for(let key in obj){	
							if(data[key]){//真机运行
							//if(data[key] instanceof Array){
								obj[key] = obj[key].concat(data[key]);
							}								
						}
					}
					//console.log(this.allData[index]['commodity'])
				}).catch(()=>{
					uni.showToast({
						title:'请求失败'
					})
				})
			// 	uni.request({
			// 		url:"http://127.0.0.1:3000/api/index_list/"+id+"/data/"+page,
			// 		success:(res) => {
			// 			if(res.statusCode!=200) return;
			// 			let data = res.data.data;
						
			// 			//首次加载数据时
			// 			if(this.allData[index].load === "first"){
			// 				data['load'] = "last";
			// 				data['page'] = 1;
			// 				data['loadText'] = "上拉加载更多"
			// 				this.allData.splice(index,1,data);//对数组元素直接赋值无法做到响应式
			// 			}else{
			// 				let obj = this.allData[index];
			// 				for(let key in obj){
			// 					if(data[key] instanceof Array){
			// 						obj[key] = obj[key].concat(data[key]);
			// 					}								
			// 				}
			// 			}
						
			// 		}
			// 	})
				
			},
			//上拉加载更多
			loadMore(index){
				//this.allData[index].loadText = "正在加载中";
				this.$set(this.allData[index],'loadText',"正在加载中");
				// this.loadText="正在加载中";
				
				//模拟延迟加载
				this.allData[index].page =this.allData[index].page+1;
				let page=this.allData[index].page;
				setTimeout(this.addData(page),3000)
				

			}
		}
	}
</script>

<style scoped>
	.wx-nav{
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 27rpx;
	}
	.scroll-content{
		width: 100%;
		height: 80rpx;
		white-space: nowrap;
		
	}
	.scroll-item{
		width: 25%;
		display: inline-block;
		text-align: center;
		padding:20rpx 0;
		font-size: 30rpx;
	}
	.active-color{
		color: red;
		border-bottom: 5rpx solid #ccc;
	}
	.load-text{
		text-align: center;
		line-height: 80rpx;
	}
</style>
