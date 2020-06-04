<style scoped lang="less">
    .userInfo-container {
        height: 100vh;
    }

    .bottom-con {
        height: 100%;
        background-color: rgb(242,242,242);

        .head-con {
            display: flex;
            @height: 4rem;
            height:  @height;
            background-color: white;
            flex-direction:row;

            .left-bar {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 4rem;
                .head-image {
                    border-radius: 50%;
                    overflow: hidden;
                    height: 3rem;
                    width: 3rem;
                }
            }

            .middle-bar {
                @margin: 0.2rem;
                line-height:  @height;
                width: 70%;

                .user-name {
                    height: calc(50% - @margin);
                    width: 100%;
                    line-height: @height / 2;
                    font-size: 1rem;
                    margin-top: 0.2rem;
                }

                .user-letter {
                    height: calc(50% - @margin);
                    width: 100%;
                    line-height: @height / 2;
                    font-size: 0.8rem;
                    margin-bottom: 0.2rem;
                }
            }

            .right-bar {
                line-height:  @height;
                width: 20%;

                .right-arrow {
                    height: 0.6rem;
                    width: 0.6rem;
                    margin-top: 0.7rem;
                }
            }
        }

        .list-item-info {
            @height: 2.5rem;
            height:  @height;
            display: flex;
            background-color: white;
            flex-direction:row;
            margin-top: 0.5rem;

            .left-bar {
                display: flex;
                align-items: center;
                justify-content: center;
                @leftBarHeight: 2.5rem;
                height: @leftBarHeight;
                width: 4rem;
                .head-image {
                    height: 2rem;
                    width:  2rem;
                }
            }

            .middle-bar {
                line-height:  @height;
                width: 70%;

                .content {
                    height: 100%;
                    width: 100%;
                    line-height: @height;
                    font-size: 0.8rem;
                }
            }

            .right-bar {
                line-height:  @height;
                width: 10%;

                .right-arrow {
                    height: 0.6rem;
                    width: 0.6rem;
                    margin-top: 0.45rem;
                }
            }
        }
    }


</style>

<template>
    <view class="userInfo-container">
        <view class="bottom-con">
            <view class="head-con" @click="jump('set')">
                <view class="left-bar">
                    <image :src="'http://island.hellochaos.cn/uploads/' + headUrl" class="head-image"></image>
                </view>
                <view class="middle-bar">
                    <view class="user-name">{{name}}</view>
                    <view class="user-letter">个性签名:{{signature}}</view>
                </view>
                <view class="right-bar">
                    <image src="http://printer.noerror.xyz/appImage/right_arrow.png" class="right-arrow"></image>
                </view>
            </view>

            <view class="list-item-info"
                 v-for="item in listItem"
                 :key="item.name"
                 @click="jump(item.module)"
            >
                <view class="left-bar">
                    <image :src="item.imageUrl" class="head-image"></image>
                </view>
                <view class="middle-bar">
                    <view class="content">{{item.name}}</view>
                </view>
                <view class="right-bar">
                    <image src="http://printer.noerror.xyz/appImage/right_arrow.png" class="right-arrow"></image>
                </view>
            </view>

        </view>
    </view>
</template>

<script>
    import {userInfo} from "../../../utils/userInfo/user";
    import {Authorization} from "../../../utils/apiManager/request";

    export default {
        name: 'userInfo',

        computed: {
            name() {
                return userInfo.Info.username
            },
            signature() {
                return userInfo.Info.signature
            }
            // headUrl () {
            //     return userInfo.Info.photo
            // }
        },

        data() {
            return {
                headUrl: '',
                listItem: [
                    {
                        name: '消息',
                        module: 'message',
                        imageUrl: 'http://printer.noerror.xyz/appImage/message.png'
                    },
                    {
                        name: '我的邮票',
                        module: 'stamp',
                        imageUrl: 'http://printer.noerror.xyz/appImage/data.png'
                    },
                    {
                        name: '树洞管理',
                        module: 'managerTree',
                        imageUrl: 'http://printer.noerror.xyz/appImage/tree.png'
                    },
                    {
                        name: '注销',
                        module: 'zhuxiao',
                        imageUrl: 'http://printer.noerror.xyz/appImage/zhuxiao.png'
                    },
                ]
            }
        },

        onShow() {
            this.initData()
        },

        methods: {
            initData() {
                this.headUrl = userInfo.Info.photo
            },
            jump(moduleName) {
                if (moduleName === 'zhuxiao') {
                    uni.showModal({
                        title: '提示',
                        content: '你确定要退出登录吗',
                        success (res) {
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
                } else {
                    uni.navigateTo({
                        url: '/pages/index/userInfoPage/' + moduleName + '/' + moduleName
                    })
                }
            }
        }


    }
</script>


