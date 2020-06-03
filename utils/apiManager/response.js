
export function getResult(data, options) {
    if (data.code == 3001) {
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
    return {
        code: data.code,
        message: data.message,
        data: data.data
    }
}
