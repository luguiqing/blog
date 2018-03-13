const login = {
	state: {
		isLogin: false,
		userInfo: null
	},

	mutations: {
		updateLoginStatus(state, payload) {
			state.isLogin = payload.isLogin
			state.userInfo = payload.userInfo;
		}
	}
};

export default login;