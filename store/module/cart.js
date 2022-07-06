export default {
	state: {
		// shopcart:[
		// 	{
		// 		id:1,
		// 		isChecked:false,
		// 		title:'请到组件下载页面，在页面右侧选择 使用 HBuilderX导入示例项目 ，体验完整组件示例。',
		// 		imgSrc:'/static/image/five.jpeg',
		// 		nprice:100.00,
		// 		count:10,
		// 	},
		// 	{
		// 		id:2,
		// 		isChecked:false,
		// 		name:'请到组件下载页面，在页面右侧选择 使用 HBuilderX导入示例项目 ，体验完整组件示例。',
		// 		imgSrc:'/static/image/six.jpeg',
		// 		nprice:200.00,
		// 		count:20,
		// 	}
		// ],
		shopcart: [
			// {
			// 	id:1,
			// 	isChecked:false,
			// 	title:'请到组件下载页面，在页面右侧选择 使用 HBuilderX导入示例项目 ，体验完整组件示例。',
			// 	imgSrc:'/static/image/five.jpeg',
			// 	nprice:100.00,
			// 	count:10,
			// },
			{
				name: '最新推荐-最新爆款',
				imgSrc: '/static/image/five.jpeg',
				type: '颜色分类：黑色 尺寸：90*90cm',
				policy: '七天无理由退货',
				price: 10,
				count: 1,
			},
			{
				name: '最新推荐-最新爆款',
				imgSrc: '/static/image/six.jpeg',
				type: '颜色分类：黑色 尺寸：45*45cm',
				policy: '七天无理由退货',
				price: 5,
				count: 2,
			}
		],
		checkedList: []
	},
	getters: {
		//判断全选
		checkedAll(state) {
			return state.shopcart.length === state.checkedList.length;
		},
		//合计
		totalCount(state) {
			let total = {
				price: 0,
				count: 0,
			}

			state.shopcart.forEach(item => {
				if (state.checkedList.indexOf(item.id) !== -1) {
					total.price += item.price * item.count;
					total.count += item.count;
				}
			})

			return total;
		}
	},
	mutations: {
		checkAll(state) {
			state.checkedList = state.shopcart.map(item => {
				item.isChecked = true;
				return item.id;
			})
		},
		unCheckAll(state) {
			state.shopcart.forEach(item => {
				item.isChecked = false;
			})
			state.checkedList = []
		},
		//单选
		checkItem(state, index) {
			let id = state.shopcart[index].id;
			let i = state.checkedList.indexOf(id);
			if (i < 0) {
				state.shopcart[index].isChecked = true;
				state.checkedList.push(id);
			} else {
				state.shopcart[index].isChecked = false;
				state.checkedList.splice(i, 1); //移除选中
			}
		},
		delShop(state) {
			state.shopcart = state.shopcart.filter(item => {
				//将选中的全部商品删除，等于-1代表没选中
				return state.checkedList.indexOf(item.id) === -1;
			})
		},
		//加入购物车
		addShopCarts(state, good) {
			state.shopcart.push(good)
		}
	},
	actions: {
		checkedAllFn({
			commit,
			getters
		}) {
			//未全选则调用全选方法
			getters.checkedAll ? commit("unCheckAll") : commit("checkAll");
		},
		deleteShop({
			commit
		}) {
			commit("delShop");
			commit('unCheckAll');
			uni.showToast({
				title: '删除成功'
			})
		}
	}

}
