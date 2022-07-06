<template>
	<view class="shop-cart">
		<template v-if="shopcart.length>0">
			<NavBar 
			title="购物车"
			:rightText="isNav?'完成':'编辑'"
			fixed="true"
			@clickRight="isNav=!isNav"
			></NavBar>
			
			<view class="shop-list">
				<view class="shop-item" v-for="(item,index) in shopcart" :key="index">
					<label class="radio" @tap="checkItem(index)">
						<radio value="" color="#FF3333" :checked="item.isChecked"/><text></text>
					</label>
					<image class="shop-img" :src="item.imgSrc" mode=""></image>
					<view class="shop-text">
						<view class="shop-name">{{item.name}}</view>
						<!-- <view class="shop-color">{{item.color}}</view> -->
						<view class="shop-content">
							<view class="shop-price">￥{{item.price}}</view>
							<view class="shop-count" v-if="!isNav">x{{item.count}}</view>
							<view class="shop-count" v-else>
								<NumBox :value="item.count" :min="1" @change="changeCount($event,index)"></NumBox>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="shop-footer">
				<view class="foot">
					<label class="radio" @tap="checkedAllFn">
						<radio value="" color="#FF3333" :checked="checkedAll"/><text>全选</text>
					</label>
					<view class="shop-total" v-if="!isNav">
						<view class="foot-total">合计:￥{{totalCount.price}}</view>
						<view class="foot-count" @tap="toConfirm">结算({{totalCount.count}})</view>
					</view>	
								
					<view class="shop-total" v-else>
						<view class="foot-count" style="background-color: #000;">移入收藏夹</view>
						<view class="foot-count" style="margin-left:0" @tap="deleteShop">删除</view>
					</view>	
				</view>
			</view>		
		</template>
		<template v-else>
			<NavBar
			title="购物车"
			fixed="true"
			></NavBar>
			
			<view class="shop-else-list">
				<text>购物车还是空的~</text>
			</view>
		</template>
		
		<TabBar currentPage="shopcart"></TabBar>		
	</view>
	

</template>

<script>
	import NavBar from '@/components/uni/uni-nav-bar.vue'
	import NumBox from '@/components/uni/uni-number-box.vue'
	import TabBar from '@/components/common/TabBar.vue'
	import {mapState,mapActions,mapGetters,mapMutations} from 'vuex'
	export default {
		components:{
			NavBar,
			NumBox,
			TabBar
		},
		data() {
			return {
				isNav:false,

			}
		},
		computed:{
			...mapState({
				shopcart:state=>state.cart.shopcart,
				checkedList:state=>state.cart.checkedList
			}),
			...mapGetters(['checkedAll','totalCount'])
		},
		methods: {
			...mapActions(['checkedAllFn','deleteShop']),
			...mapMutations(['checkItem']),
			changeCount(value,index){
				//事件传递的第一个参数必须使用$event，代表输入框中的值
				this.shopcart[index].count = value;
			},
			toConfirm(){
				//判断是否有商品
				if(this.checkedList.length===0){
					return uni.showToast({
						title:'请选择商品'
					})
				}
				
				let list = JSON.stringify(this.shopcart);
				uni.navigateTo({
					url:'../confirm-order/confirm-order?list='+list
				})
			}
		}
	}
</script>


<style scoped>
.shop-cart{
	padding-bottom:100rpx;
}
.shop-else-list{
	position: absolute;
	left:50%;
	top:50%;
	transform: translate(-50%,-50%);
	background-color: #f7f7f7;
}
.shop-item{
	display: flex;
	align-items: center;
	background-color: #f7f7f7;
	margin-bottom: 20rpx;
}
.shop-img{
	width: 200rpx;
	height: 180rpx;
}
.shop-text{
	flex: 1;
	padding: 0 20rpx;
}
.shop-name{
	font-size: 30rpx;;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
	overflow:hidden;            
	text-overflow:ellipsis;   
}
.shop-color{
	font-size: 30rpx;
	color:#ccc;
}
.shop-content{
	display: flex;
	justify-content: space-between;
	padding-top:40rpx;
}
.shop-footer{
	position: fixed;
	bottom:90rpx;
	left:0;
	width:100%;
	justify-content:space-between;
	align-items:center;
	padding:20rpx 10rpx;
}
.radio{
	padding-left:20rpx
}

.foot{
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.shop-total{
	display: flex;
}
.foot-total{
	line-height:80rpx;
	padding:10 20rpx;
	font-size:36rpx;
} 
.foot-count{
	margin:0 20rpx;
	padding:0 10rpx;
	line-height: 80rpx;
	color:#fff;
	background-color:#49bdfb;
}
</style>
