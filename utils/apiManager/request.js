let baseUrl = 'http://island.hellochaos.cn/island/api/v1';
let Authorization = ''
uni.getStorage({
    key: 'Authorization',
    success: function (res) {
        console.log(res.data)
        console.log(res.data);
        Authorization = res.data
    }
});

/**
 * 固化auth
 * @param header
 */
function intercept(header) {
    const auth = header.Authorization || header.authorization
    uni.getStorage({
        key: 'Authorization',
        success: function (res) {
            //如果auth存在说明更换了一个人登录，此时重置auth
            if (auth) {
                Authorization = auth
                uni.clearStorageSync()
                uni.setStorage({
                    key: 'Authorization',
                    data: auth
                });
            } else {
                //解决热更新清空auth问题
                Authorization = res.data
            }
        },
        fail: function () {
            //获取失败可能是注销了登录，或者是首次登录
            uni.setStorage({
                key: 'Authorization',
                data: auth
            });
            Authorization = auth
        }
    });

}

export class Request {
    get(url) {
        return new Promise(resolve => {
            uni.request({
                url: baseUrl + url,
                method: "GET",
                header: {
                    "Authorization": Authorization
                },
                success: function (res) {
                    resolve(res.data)
                },
                error: function (e) {
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
                success: function (res) {
                    intercept(res.header)
                    //返回什么就相应的做调整
                    resolve(res.data)
                },
                error: function (e) {
                    reject("网络出错");
                }
            });
        })
    }

    upload(url, filepath) {
        return new Promise(resolve => {
            uni.uploadFile({
                url: baseUrl + url,
                filePath: filepath,
                header: {
                    "Authorization": Authorization
                },
                name: 'file',
                success: (res) => {
                    resolve(JSON.parse(res.data))
                }
            });
        })
    }

    put(url, data) {
        return new Promise(resolve => {
            uni.request({
                url: baseUrl + url,
                data: JSON.stringify(data),
                method: "PUT",
                header: {
                    "content-type": "application/json",
                    "Authorization": Authorization
                },
                success: function (res) {
                    //返回什么就相应的做调整
                    resolve(res.data)
                },
                error: function (e) {
                    reject("网络出错");
                }
            });
        })
    }

    delete(url, data) {
        return new Promise(resolve => {
            uni.request({
                url: baseUrl + url,
                data: JSON.stringify(data),
                method: "DELETE",
                header: {
                    "content-type": "application/json",
                    "Authorization": Authorization
                },
                success: function (res) {
                    //返回什么就相应的做调整
                    resolve(res.data)
                },
                error: function (e) {
                    reject("网络出错");
                }
            });
        })
    }
}

// const Request = new _Request();
// export {Request}

export {baseUrl, Authorization}
