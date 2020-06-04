<style scoped lang="less">
    .logout {
        border-bottom: 1px solid #f2f2f2;
        display: flex;
        flex-direction: row;
        height: 2.5rem;
        width: 100%;
        .logout-image {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 20%;
            image {
                display: block;
                height: 2rem;
                width: 2rem;
            }
        }
        .content {
            height: 80%;
            line-height: 2.5rem;
        }
    }


</style>

<template>
    <view>
        <view class="logout" @click="logout">
            <view class="logout-image">
                <image src="http://printer.noerror.xyz/appImage/zhuxiao.png"></image>
            </view>
            <view class="content">注销</view>
        </view>
    </view>
</template>

<script>
    export default {
        name: 'logout',

        data() {
            return {}
        },


        methods: {
            logout() {
                uni.showModal({
                    title: '提示',
                    content: '你确定要退出登录吗',
                    success(res) {
                        if (res.cancel) {
                            //点击取消,默认隐藏弹框
                        } else {
                            uni.clearStorageSync()
                            uni.navigateTo({
                                url: '/pages/loginPage/login',
                                fail(res) {
                                    console.log(res)
                                }
                            })
                        }
                    }
                })
            }
        }


    }
</script>


