export default{
	state:{
		status:false,
		token:null,
		userInfo:{}
	},
	getters:{
		
	},
	mutations:{
		initUser(state){
			//同步读取
			let userInfo = uni.getStorageSync('userInfo');
			if(userInfo){
				let user = JSON.parse(userInfo);
				state.userInfo=user;
				state.status=true;
				state.token=user.token;
			}
		},
		loginSuccess(state,userInfo){
			state.userInfo=userInfo;
			state.status=true;
			state.token= userInfo.token;
			//同步存取
			uni.setStorageSync('userInfo',JSON.stringify(userInfo));
		},
		loginOut(state){
			state.status =false;
			state.userInfo ={};
			state.token=null;
			uni.removeStorageSync('userInfo')
		}
	}
}