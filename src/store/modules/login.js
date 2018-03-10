const login = {
	state: {
		isLogin: false
	},

	mutations: {
		updateLoginStatus(state, payload) {
			state.isLogin = payload.isLogin
		}
	}
};

export default login;