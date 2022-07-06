<template>
	<view class="order">
		<Lines></Lines>
		<view class="order-header">
			<view 
			class="header-item" 
			v-for="(item,index) in orderList" :key="index"
			@tap="tapClick(index)"
			><text :class="currentIndex===index?'active-color':''" >{{item.name}}</text></view>
		</view>
		
		<template v-if="orderList[currentIndex].list.length>0">		
			<view class="order-good" v-for="(item,index) in orderList[currentIndex].list" :key="index">
				<view class="good-status">
					<view>moumu旗舰店</view>
					<view class="good-active-color">{{item.status}}</view>
				</view>
				<view class="good-content">
					<image class="good-img" :src="item.good.imgSrc" mode=""></image>
					<view class="good-text">
						<view class="good-name">{{item.good.name}}</view>
						<view class="good-list">{{item.good.type}}</view>
						<view class="good-type">{{item.good.policy}}</view>
				   </view>
				   <view class="good-foot">
						<view class="good-price">￥{{item.good.price}}</view>
						<view class="good-count" >x{{item.good.count}}</view>
				   </view>
			    </view>
				<view class="good-total">
					<view>订单金额: ￥{{item.totalPrice}}<text>(含运费￥0.00)</text></view>
				</view>
				
				<view class="good-btn" v-if="item.status=='待付款'">支付</view>
				<view class="good-btn" v-else>已支付</view>
			</view>
		</template>					
	
		<template v-else>
			<view class="order-no">
				<view class="no-text">您还没有订单</view>
				<view class="no-btn">去逛逛</view>
			</view>
		</template>
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
				orderList:[
					{
						name:'全部',
						list:[
							{
								status:'待付款',
								totalPrice:6000,
								good:{
									name:'最新推荐-最新爆款',
									imgSrc:'/static/image/five.jpeg',
									type:'颜色分类：黑色 尺寸：45*45cm',
									policy:'七天无理由退货',
									price:600,
									count:10,
								}
							},
							{
								status:'已支付',
								totalPrice:16000,
								good:{
									name:'最新推荐-最新爆款',
									imgSrc:'/static/image/six.jpeg',
									type:'颜色分类：黑色 尺寸：80*80cm',
									policy:'七天无理由退货',
									price:800,
									count:20,
								}
							}
						]
					},
					{
						name:'待付款',
						list:[]
					},
					{
						name:'待发货',
						list:[]
					},
					{
						name:'待收款',
						list:[]
					},
					{
						name:'待评介',
						list:[]
					}
				],
				currentIndex:0,
			}
		},
		methods: {
			tapClick(index){
				this.currentIndex=index
			}
		}
	}
</script>

<style scoped>
.order{
	background-color: #f7f7f7;
	height: 1000rpx;
	position: relative;
}
.order-header{
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #fff;
}
.order-good{
	background-color: #fff;
	overflow: hidden;
	margin-bottom: 20rpx;
}


.header-item{
	width: 100%;
	flex: 1;
	line-height: 80rpx;
	text-align: center;
	position: relative;
}
.active-color{
	color: red;
	border-bottom: 5rpx solid #49bdfb;
}
.good-status{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding:10rpx 8rpx;
}
.good-active-color{
	color:#49bdfb
}

.good-content{
	display: flex;
	background-color: #f7f7f7;
	margin-bottom:2rpx;
}

.good-list{
	color:#ccc;
	font-size: 26rpx;
}
.good-type{
	color:#49bdfb;
	font-size: 24rpx;
}
.good-foot{
	flex:1;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	padding-right: 10rpx;
}
.good-img{
	width: 200rpx;
	height: 180rpx;
}

.good-name{
	font-size: 30rpx;;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
	overflow:hidden;            
	text-overflow:ellipsis;   
}
.good-total{
	display: flex;
	justify-content: flex-end;
	padding:20rpx 0;
}
.good-btn{
	float: right;
	text-align: right;
	color:#49bdfb;
	border:2rpx solid #49bdfb;
	border-radius: 10rpx;
	padding:4rpx 10rpx;
	margin: 0 20rpx 20rpx 0;
}
.order-no{
	position: absolute;
	left:50%;
	top:50%;
	transform: translate(-50%,-50%);
}
.no-btn{
	text-align: center;
	color:#49bdfb;
	border:2rpx solid #49bdfb;
	border-radius: 10rpx;
	padding:4rpx 10rpx;
	margin: 20rpx;
}
</style>
