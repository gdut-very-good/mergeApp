<style scoped lang="less">
    .register-login-con {
        height: 100vh;
    }

    .bg {
        height: 100vh;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }

    .bg::before {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background-color: rgba(0, 0, 0, .6);
        z-index: 0;
    }

    .outer-con {
        height: auto;
    }

    .placeholderColor(@color) {
        input::-webkit-input-placeholder {
            color: @color;
        }
        input::-moz-placeholder { /* Mozilla Firefox 19+ */
            color: @color;
        }
        input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            color: @color;
        }
        input:-ms-input-placeholder { /* Internet Explorer 10-11 */
            color: @color;
        }
    }

    .login-or-register {
        height: 2rem;
        width: 90%;
        margin: auto;
        padding-top: 2rem;
        display: flex;
        flex-direction: row;
        color: white;

        .app-logo {
            height: 2rem;
            width: 2rem;
            line-height: 2rem;
            border-radius: 50%;
            background-color: #097cf3;
            text-align: center;
            font-size: 0.8rem;
        }

        .swtich {
            width: calc(100% - 2rem);
            text-align: right;
            font-size: 0.8rem;
        }
    }

    .login-con {
        margin-top: 1rem;

        .user-name {
            width: 90%;
            margin: auto;
            text-align: left;
            color: white;
            font-size: 0.8rem;
            .placeholderColor(white);
        }

        .user-name-input {
            height: 2rem;
            width: 90%;
            margin: auto;
            border-bottom: 1px solid grey;
            color: white;
        }
    }


    .login-btn {
        height: 2.5rem;
        width: 90%;
        margin: auto;
        line-height: 2.5rem;
        color: white;
        text-align: center;
        margin-top: 1rem;
        color: white;
        border-radius: 4px;
        font-size: 0.8rem;
    }
</style>

<template>
    <view class="register-login-con">
        <image src="../../static/login_bg.jpg" class="bg"></image>
        <view class="login-or-register">
            <view class="app-logo">海岛</view>
            <view class="swtich" @click="switchLogin">{{logShow?'新用户注册':'登录'}}</view>
        </view>
        <view v-if="logShow" class="outer-con">
            <view class="login-con">
                <view class="user-name">用户名</view>
                <input type="text" class="user-name-input" placeholder="用户名" v-model="log.username">
                <view class="user-name" style="margin-top: 1rem;">密码</view>
                <input type="password" class="user-name-input" placeholder="密码" v-model="log.password">
            </view>
        </view>
        <view v-if="!logShow" class="outer-con">
            <view class="login-con">
                <view class="user-name">用户名</view>
                <input type="text" class="user-name-input" placeholder="用户名" v-model="sign.username">
                <view class="user-name" style="margin-top: 1rem;">密码</view>
                <input type="password" class="user-name-input" placeholder="密码" v-model="sign.password">
                <view class="user-name" style="margin-top: 1rem;">确认密码</view>
                <input type="password" class="user-name-input" placeholder="密码" v-model="sign.confirm">
            </view>
        </view>
        <view
                class="login-btn"
                :style="changeColor"
                @click="toIndex(logShow?'log':'reg')"
        >
            {{logShow?'登录':'注册'}}
        </view>
    </view>
</template>

<script>
    import {loginModules} from "@/utils/apiManager/loginApi";
    import {userInfo} from '@/utils/userInfo/user'
    import {errorCode} from "../../utils/errorCode/errorCode";

    export default {
        name: 'login',
        data() {
            return {
                logShow: true,
                log: {
                    username: '',
                    password: ''
                },
                sign: {
                    username: '',
                    password: '',
                    confirm: ''
                }
            }
        },
        computed: {
            changeColor() {
                if (this.log.password.length !== 0 || !this.logShow) {
                    return 'background-color: #097cf3;color: white;'
                }
                return 'background-color: black;opacity: 0.2;'
            }
        },
        methods: {
            toIndex(options) {
                if (options === 'log') {
                    let data = {
                        username: this.log.username,
                        password: this.log.password
                    };
                    loginModules.login(data).then(res => {
                        if (res.code == 1) {
                            userInfo.initInfo(res.data)
                            uni.showToast({
                                title: '登录成功'
                            })
                            setTimeout(() => {
                                uni.switchTab({
                                    url: '/pages/index/letter/writerLetter/writerLetter',
                                    success: () => {
                                    },
                                    fail: (res) => {
                                        console.log(res)
                                    }
                                })
                            }, 500)
                        } else {
                            errorCode(res)
                        }
                    })
                } else {
                    if (this.sign.confirm !== this.sign.password) {
                        alert('两次密码输入不一致')
                        return
                    }
                    const data = {
                        "username": this.sign.username,
                        "password": this.sign.password,
                        "mail": '',
                        "nickname": this.sign.username,
                        "signature": "",
                        "city": ""
                    };
                    loginModules.register(data).then(res => {
                        if (res.code == 1) {
                            uni.showToast({
                                title: '注册成功'
                            })
                            setTimeout(() => {
                                uni.switchTab({
                                    url: '/pages/index/letter/writerLetter/writerLetter',
                                })
                            }, 500)
                        } else {
                            errorCode(res)
                        }
                    })
                }
            },

            switchLogin() {
                this.logShow = !this.logShow
            }
        }
    }
</script>
