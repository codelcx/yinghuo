import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

//全局挂载
import $http from '@/common/api/request';
Vue.prototype.$http=$http

//Vuex
import store from 'store'
Vue.prototype.$store = store;


//登录拦截
Vue.prototype.navTo = (options)=>{
	if(!store.state.user.status){
		uni.showToast({
			title:'您还没有登录',
		})
		
		return uni.navigateTo({
			url:'/pages/login/login'
		})
	}
	uni.navigateTo({
		url:`/pages/${options.url}/${options.url}`,
	})
}


const app = new Vue({
	store,
    ...App,
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif