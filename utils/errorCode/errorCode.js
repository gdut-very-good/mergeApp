/**
 * 对错误返回码的统一处理
 * @param res
 */
export function errorCode(res) {
	if (res.code == 3001) {
	   uni.showToast({
			title:'请登录后重试',
			icon: "none"
	   })
	} else {
		uni.showToast({
			title:res.message,
			icon: "none"
		})
	}
}