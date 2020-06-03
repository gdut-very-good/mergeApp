import {Request} from "./request";

class _Api extends Request{
	constructor() {
		super();
	}
	@RequestInterceptor
	get(url) {
		return super.get(url);
	}
	@RequestInterceptor
	post(url, data) {
		return super.post(url, data);
	}
	@RequestInterceptor
	delete(url, data) {
		return super.delete(url, data);
	}
	@RequestInterceptor
	upload(url, filepath) {
		return super.upload(url, filepath);
	}
}

function reLogin() {
	uni.showToast({
		title: '请登录后操作',
		icon: 'none'
	});
	setTimeout(() => {
		uni.navigateTo({
			url: '/pages/loginPage/login',
			fail(res) {
				console.log(res)
			}
		})
	}, 500)
}
function RequestInterceptor(request, key, config) {
	let cache = request[key];
	config.value = function(...args) {
		return cache(...args).then((res) => {
			if (res.code === "3001") {
				reLogin();
			}
			return res;
		})
	};
}
const Api = new _Api();




export default Api;
