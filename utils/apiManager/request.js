let baseUrl = 'http://island.hellochaos.cn/island/api/v1';
let Authorization = '147869e8-1261-45a1-b695-83f2f5860edf'

class _Request {
    get(url) {
		return new Promise(resolve => {
			uni.request({
			    url: baseUrl + url,
			    method: "GET",
			    header: {
			        "Authorization": Authorization
			    },
			    success: function(res) {
					resolve(res.data)
				},
			    error: function(e) {
			        reject("网络出错");
				}
			});
		})
    }

    post(url, data) {
		return new Promise(resolve => {
			uni.request({
			    url: baseUrl + url,
			    data: JSON.stringify(data),
			    method: "POST",
			    header: {
			        "content-type": "application/json",
			        "Authorization": Authorization
			    },
			    success: function(res) {
					//返回什么就相应的做调整
					resolve(res.data)
				},
			    error: function(e) {
			        reject("网络出错");
				}
			});
		})
    }

    // upload(url, data) {
    //     return _Request.post(baseUrl + url, data, {
    //         headers: {'Content-Type': 'multipart/form-data'}
    //     });
    // }

    // put(url, data) {
    //     return _Request.put(baseUrl + url, JSON.stringify(data));
    // }

    // delete(url) {
    //     return _Request.delete(baseUrl + url);
    // }
}

const Request = new _Request();
export {Request}

export {baseUrl, Authorization}
