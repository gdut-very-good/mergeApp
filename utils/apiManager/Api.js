import {baseUrl} from "./request";

const successCode = "1";
const successMsg = "success";
const Authorization = '94a666e5-a070-42d8-b0a2-b7a9dfe2d4c5';
// const Request = axios.create({
// 	baseURL: baseUrl,
// 	headers: {
// 		'Content-Type': 'application/json',
// 	}
// });

/**
 * 统一对请求进行处理
 */
// Request.interceptors.request.use((config) => {
// 	config.headers['Authorization'] = Authorization;
// 	return config;
// }, error => {
//
// });

// /**
//  * 统一对返回的数据进行过滤
//  */
// Request.interceptors.response.use((result) => {
// 	let {data} = result;
// 	let {code, message} = data;
// 	if (successCode === code || successMsg === message) {
// 		return data.data;
// 	} else {
// 		console.log(Authorization);
// 		if (code === "3001") {
// 			window.location.hash = "/login";
// 		}
//
// 		return Promise.reject(data);
// 	}
// }, (error) => {
// 	// 请求发生错误的时候
// 	return error;
// });

const Request = {
	get(url, params) {
		console.log(Authorization);
		return new Promise((resolve, reject) => {
			uni.request({
				url : baseUrl + url,
				data : params,
				method: 'GET',
				success : resolve,
				fail : reject,
				header: {
					"Authorization" : Authorization
				},
			})
		})
	},
	post(url, data) {
		return new Promise((resolve, reject) => {
			uni.request({
				url : baseUrl + url,
				data,
				method: 'POST',
				success : resolve,
				fail : reject,
				header : {
					"Authorization" : Authorization
				},
			})
		})
	}
};

function responseInterceptors() {

}




class Api {
	get(url, data) {
		return Request.get(url, {
			params: data
		})
	}
	post(url, data) {
		return Request.post(url, data);
	}

	// upload(url, data) {
	// 	if (!(data instanceof FormData)) {
	// 		data = dataToFormData(data);
	// 	}
	// 	return Request.post(url, data, {
	// 		headers: {'Content-Type': 'multipart/form-data'}
	// 	});
	// }

	// put(url, data) {
	// 	console.log(data);
	// 	return Request.put(url, data);
	// }
}

function dataToFormData(data) {
	let formData = new FormData();
	Object.keys(data).forEach((key) => {
		formData.append(key, data[key]);
	});
	return formData;
}

export default new Api();
