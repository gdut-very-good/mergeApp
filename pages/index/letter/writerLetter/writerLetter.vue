<template>
    <view class="writeLetter-container">
        <view class="box-add">
            <view class="add-circle" @click="openBtn">+</view>
        </view>
        <view class="box" v-if="showMenu">
            <view class="other-item-shudong" @click="jump('shudong')">树洞</view>
        </view>
        <view class="box-jiaonang" v-if="showMenu">
            <view class="other-item-jiaonang" @click="jump('jiaonang')">胶囊</view>
        </view>
        <view class="box-xiexin" v-if="showMenu">
            <view class="other-item-xiexin" @click="jump('letter')">写信</view>
        </view>
        <view class="bottom-con">
            <letterNav @changeModule="changeModule"></letterNav>
            <friendList :style="show?'display:block':'display:none'"></friendList>
            <shudongList :style="!show?'display:block':'display:none'"></shudongList>
        </view>
    </view>
</template>

<script>
    import friendList from '../../../../components/friendList/friendList'
    import {loginModules} from '@/utils/apiManager/loginApi.js'
	import {getStaticDraftInfo} from "../../../../utils/draftInfo/info";

    export default {
        data() {
            return {
                show: true,
                showMenu: false
            }
        },

        mounted() {

        },

        methods: {
            changeModule(data) {
                if (data.module === 'shudongList') {
                    this.show = false
                } else {
                    this.show = true
                }
            },

            jump(module) {
                uni.navigateTo({
                    url: '../' + module + '/' + module,
                    success: res => {
                        console.log(res)
                    },
                    fail: (res) => {
                        console.log(res)
                    },
                    complete: () => {
                    }
                });
            },

            openBtn() {
                this.showMenu = true
            }
        }
    }
</script>

<style scoped lang="less">
    .writeLetter-container {
        padding-bottom: 1.6rem;
    }

    .bottom-con {
        height: 100%;
        width: 100%;
    }

    .add-circle {
        pointer-events: auto;
        right: 1.95rem;
        z-index: 100;
        @radius: 2.5rem;
        height: @radius;
        width: @radius;
        font-size: 2rem;
        text-align: center;
        line-height: 2.2rem;
        background-color: rgb(203, 176, 68);
        border-radius: 50%;
        position: absolute;
        bottom: 2.75rem;
        color: white;
    }

    //渲染box公共样式
    .publicBox {
        pointer-events: none;
        bottom: 4rem;
        right: 0;
        position: fixed;
        height: 8rem;
        width: 6.4rem;
        background-color: transparent;
        z-index: 10;
    }


    //按钮公共一样
    .letter-button {
        pointer-events: auto;
        @radius: 2.5rem;
        position: absolute;
        height: @radius;
        width: @radius;
        text-align: center;
        line-height: @radius;
        font-size: 0.8rem;
        color: white;
        background-color: rgb(200, 200, 200);
        border-radius: 50%;
        z-index: 100;
        bottom: 0;
        right: 1.95rem;
    }

    .box {
        .publicBox;
        animation: circleRoate 1s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
    }

    .box-jiaonang {
        .publicBox;
        animation: circleRoate_jiaonang 1s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
    }

    .box-add {
        .publicBox;
    }

    .box-xiexin {
        .publicBox;
    }

    @keyframes circleRoate_jiaonang {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(90deg);
        }
    }


    @keyframes circleRoate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(180deg);
        }
    }

    .other-item-shudong {
        .letter-button;
        transform: rotate(180deg);
    }

    .other-item-jiaonang {
        .letter-button;
        transform: rotate(-90deg);
    }

    .other-item-xiexin {
        .letter-button;
    }
</style>
