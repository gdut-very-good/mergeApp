<script>
    import {myApi} from "./utils/apiManager/myApi";
    import {userInfo} from "./utils/userInfo/user";

    export default {
        onLaunch: function () {
            console.log('App Launch');
        },
        onShow: function () {
            uni.getStorage({
                key: 'Authorization',
                success: function (res) {
                    myApi.getAuthUserInfo(res.data).then(res => {
                        userInfo.initInfo(res.data);
                        uni.reLaunch({
                            url: '/pages/index/letter/writerLetter/writerLetter',
                        })
                    })
                },
                fail() {
                    console.log('请求头部已经不存在')
                }
            });
        },
        onHide: function () {
            console.log('App Hide');
        }
    };
</script>

<style>
    /* 解决头条小程序组件内引入字体不生效的问题 */
    /* #ifdef MP-TOUTIAO */
    @font-face {

    }

    /* #endif */
</style>
