import store from 'store'
export default {
	common: {
		baseUrl: "http://192.168.200.105:3000/api",
		data: {},
		header: {
			"Content-Type": "application/json",
			"Content-Type": "application/x-www-form-urlencoded"
		},
		method: 'GET',
		dataType: 'json'
	},

	request(options = {}) {
		options.url = this.common.baseUrl + options.url;
		options.data = options.data || this.common.data;
		options.header = options.header || this.common.header;
		options.method = options.method || this.common.method;
		options.dataType = options.dataType || this.common.dataType;

		// if (options.header.token) {
		// 	options.header.token = store.state.user.token;

		// 	if (options.header.token) {
		// 		uni.showToast({
		// 			title: '您还没有登录',
		// 		})

		// 		return uni.navigateTo({
		// 			url: '/pages/login/login'
		// 		})
		// 	}
		// }

		return new Promise((res, rej) => {
			uni.request({
				...options,
				success: (result) => {
					
					if (result.statusCode != 200) return rej();
					let data = result.data.data;
					return res(data);
				},
				fail(err){
					console.log(err)
				}
			})
		})
	}
}
