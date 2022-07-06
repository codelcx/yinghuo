import Vue from 'vue'
import Vuex from 'vuex'

import cart from './module/cart'
import address from './module/address'
import user from './@/store/module/user'

Vue.use(Vuex)

export default new Vuex.Store({
		modules:{
			user,
			cart,
			address,
	}
})
