import {Request} from "./request";

class _Api extends Request{
	constructor() {
		super();
	}
	@ResponseInterceptor
	get(url) {
		return super.get(url);
	}
	@ResponseInterceptor
	post(url, data) {
		return super.post(url, data);
	}
	@ResponseInterceptor
	delete(url, data) {
		return super.delete(url, data);
	}
	@ResponseInterceptor
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
function ResponseInterceptor(request, key, config) {
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


// document.oncopy = null;
// document.onselectstart = null;
// document.oncontextmenu = null;
// document.oncut = null;
// document.



export default Api;
