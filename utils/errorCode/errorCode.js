/**
 * 对错误返回码的统一处理
 * @param res
 */
export function errorCode(res) {
    uni.showToast({
        title: res.message,
        icon: "none"
    })
}