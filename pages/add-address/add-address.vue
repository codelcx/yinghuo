<template>
	<view>
		<view class="add-item">
			<view>收件人</view>
			<input type="text" value="" placeholder="收件人姓名" v-model="address.name"/>
		</view>
		
		<view class="add-item">
			<view>手机号</view>
			<input type="text" value="" placeholder="11位手机号" v-model="address.tel"/>
		</view>
		
		<view class="add-item">
			<view>所在地</view>
			<view class="address-select" @tap="showCityPicker">{{address.city}} > </view>
		</view>
		
		<view class="add-item">
			<view>详细地址</view>
			<input type="text" value="" placeholder="5-60个字符" v-model="address.detail"/>
		</view>
		
		<view class="add-item">
			<view>邮编</view>
			<input type="text" value="" placeholder="可选填" v-model="address.youbian"/>
		</view>
		
		<view class="add-item">
			<view>设为默认地址</view>
			<radio-group name="" @change="radioChange">
				<label class="radio">
					<radio value="" :checked="address.isDefault" /><text></text>
				</label>
			</radio-group>

		</view>
		
		<CityPicker ref="CityPicker" @onConfirm="onConfirm"></CityPicker>
	</view>
</template>

<script>
	import CityPicker from '@/components/uni/mpvue-citypicker/mpvueCityPicker.vue'
	import {mapState,mapActions,mapMutations} from 'vuex'
	export default {
		components:{
			CityPicker
		},
		data() {
			return {
				city:'请选择',
				address:{
					name:'',
					tel:'',
					city:'请选择',
					detail:'',
					youbian:'',
					isDefault:false,
				},
				status:false,//修改or新增
				addressIndex:-1
			}
		},
		computed:{
			...mapState({
				list:state=>state.list
			}),
		},
		onLoad(e) {
			if(e.data){
				uni.setNavigationBarTitle({
					title:"修改地址"
				})
				
				let result = JSON.parse(e.data);
				this.address=result.item;
				this.addressIndex = result.index;
				this.status=true;
			}
			
		},
		onNavigationBarButtonTap(e){
			
			if(this.status){
				this.editAddressFn({
					index:this.addressIndex,
					item:this.address,
				})
				// uni.showToast({
				// 	title:"修改成功"
				// })
			}else{
				this.addAddressFn(this.address);
				// uni.showToast({
				// 	title:"保存成功"
				// })
			}
			//点击保存返回，delta返回的页数
			uni.navigateBack({
				delta:1
			})

		},
		methods: {
			...mapActions(['addAddressFn']),
			...mapActions(['editAddressFn']),
			showCityPicker(){
				this.$refs.CityPicker.show();
			},
			onConfirm(e){
				this.city=e.label;
				this.address.city=e.label;
			},
			//默认地址状态
			radioChange(){
				this.address.isDefault = !this.address.isDefault;
			}
		}
	}
</script>

<style scoped>
.add-item{
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding:16rpx 0;
	border-bottom: 2rpx solid #ccc;
}
.add-item input{
	flex:1;
	text-align: left;
	padding-left:10rpx;
	font-size: 26rpx;
}

</style>
