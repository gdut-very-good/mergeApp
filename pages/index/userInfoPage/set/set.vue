<style scoped lang="less">
    @bgColor: #b9aaaa;
    @fontSize: 0.4rem;

    .userInfo {
        height: 100vh;
    }

    .bottom-con {
        height: calc(100% - 1.5rem);
        background-color: rgb(242, 242, 242);

        .list-item {
            position: relative;
            background-color: white;
            display: flex;
            flex-flow: row;
            height: 2.5rem;
            width: 100%;
            border-bottom: 1px solid #d6d4d4;

            .left-bar {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                height: 100%;
                width: 25%;
                font-size: 0.8rem;

                .head-image {
                    height: 2rem;
                    width: 2rem
                }

                .left-bar-content {
                    text-align: center;
                    line-height: 2.5rem;
                    height: 100%;
                    width: 100%;

                    image {
                        display: block;
                        height: 2.5rem;
                        width: 2.5rem;
                        border-radius: 50%;
                        overflow: hidden;
                        margin: 0.25rem auto auto auto;
                    }
                }
            }

            .right-bar {
                color: #d6d4d4;
                position: relative;
                line-height: 2.5rem;
                text-align: right;
                font-size: 0.8rem;
                height: 100%;
                width: 70%;
            }

            .right-arrow {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                font-size: 0.8rem;

                image {
                    display: block;
                    height: 1rem;
                    width: 1rem;
                }
            }

        }
    }

    .other-item {
        width: 90%;
        margin: auto;
        height: 2rem;
        line-height: 2rem;
        font-size: 0.8rem;
    }

    .head {
        margin-bottom: 1rem;
    }

    .upload {
        position: absolute;
        height: 100%;
        width: 100%;
        z-index: 10;
    }


</style>

<template>
    <view class="userInfo">
        <view class="bottom-con">
            <!--头像信息-->
            <view class="list-item head" @click="fileUpload" style="height: 3rem">
                <view class="left-bar">
                    <view class="left-bar-content">
                        <image :src="'http://island.hellochaos.cn/uploads/' + headImage"></image>
                    </view>
                </view>
                <view class="right-bar" style="text-align: left;line-height: 3rem">
                    修改头像
                </view>
                <view class="right-arrow">
                    <image src="http://printer.noerror.xyz/appImage/right_arrow.png" class="right-arrow"></image>
                </view>
            </view>
            <view
                    class="list-item"
                    v-for="item in listItem"
                    :key="item.name"
                    @click="jump(item.module, item.content)"
            >
                <view class="left-bar">
                    <view class="left-bar-content" style="left: 0.4rem">{{item.name}}</view>
                </view>
                <view class="right-bar">
                    <view class="right-bar-content">{{item.content}}</view>
                </view>
                <view class="right-arrow">
                    <image src="http://printer.noerror.xyz/appImage/right_arrow.png" class="right-arrow"></image>
                </view>
            </view>
            <view class="other-item">接受信件数量:  {{receiveNumber}}</view>
            <view class="other-item">发送信件信件数量:  {{writeNumber}}</view>
            <view class="other-item">胶囊数量:  {{jiaonangNum}}</view>
        </view>
    </view>
</template>

<script>
    import {myApi} from "../../../../utils/apiManager/myApi";
    import {errorCode} from "@/utils/errorCode/errorCode";
    import {userInfo} from "../../../../utils/userInfo/user";
    import App from "../../../../App";

    export default {
        name: 'set',

        watch: {
            'headImage': function (value) {
                this.headImage = value
            }
        },

        computed: {
            jiaonangNum() {
                return userInfo.Info.capsule + '个'
            },
            receiveNumber() {
                return userInfo.Info.receiveLetter + '封'
            },
            writeNumber() {
                return userInfo.Info.sendLetter + '封'
            }
        },

        data() {
            return {
                headImage: '',
                listItem: [
                    {
                        name: '笔名',
                        module: 'nickname',
                        content: '',
                    },
                    {
                        name: '签名',
                        module: 'signature',
                        content: '',
                    },
                    // {
                    //     name: 'ID',
                    //     module: 'userId',
                    //     content: '',
                    // },
                    {
                        name: '地区',
                        module: 'city',
                        content: '',
                    },
                    {
                        name: '邮箱',
                        module: 'mail',
                        content: '',
                    },
                ]
            }
        },

        onShow() {
            this.initData()
        },

        methods: {
            jump(module, value) {
                uni.navigateTo({
                    url: './changeInfo/changeInfo?module=' + module + '&value=' + value,
                    fail(res) {
                        console.log(res)
                    }
                })
            },

            fileUpload() {
                const _this = this
                uni.chooseImage({
                    count: 1, //默认9
                    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album'], //从相册选择
                    success: function (res) {
                        const tempFilePaths = res.tempFilePaths[0];
                        myApi.uploadHeadIcon(tempFilePaths).then(res => {
                            if (res.code == 1) {
                                uni.showToast({
                                    title: '上传成功',
                                    icon: 'none'
                                })
                                _this.headImage = res.data
                                userInfo.Info.photo = res.data
                            } else {
                                errorCode(res)
                            }
                        })
                    }
                });
            },
            initData() {
                for (let i = 0; i < this.$data.listItem.length; i++) {
                    this.$data.listItem[i]['content'] = userInfo.Info[this.$data.listItem[i]['module']]
                }
                this.headImage = userInfo.Info.photo
            }
        }
    }
</script>


