export default{
	state:{
		list:[
			{
				name:'张三',
				tel:'18277777777',
				city:'北京市',
				detail:'xxxxxxxxxxxxxxxxxxxx',
				youbian:'520000',
				isDefault:true,
			},
			{
				name:'李四',
				tel:'18277777777',
				city:'北京市',
				detail:'yyyyyyyyyyyyyyyyyyyy',
				youbian:'520000',
				isDefault:false,
			}
		]
	},
	getters:{
		defaultAddress(state){
			return  state.list.filter(item=>item.isDefault)
		}
	},
	mutations:{
		addAddress(state,address){
			state.list.unshift(address);
		},
		editAddress(state,address){
			let {index,item} = address;
			for(let key in item){
				state.list[index][key] = item[key]
			}
		},
		removeAddress(state){
			state.list.forEach(item=>{
				item.isDefault=false;
			})
		}
	},
	actions:{
		addAddressFn({commit},address){
			if(address.isDefault){
				//将所有地址设置为不选中
				commit('removeAddress')
			}
			commit('addAddress',address);
		},
		editAddressFn({commit},address){
			if(address.item.isDefault){
				//将所有地址设置为不选中
				commit('removeAddress')
			}
			commit('editAddress',address)
		}
	}
	
}