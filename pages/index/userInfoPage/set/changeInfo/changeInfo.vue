<style scoped lang="less">
    @bgColor: rgb(242,242,242);
    .change-con {
        @height: 2.5rem;
        height: @height;
        .change-item {
            background-color: @bgColor;
            height: @height;
            padding-left: 0.8rem;
            width: 100%;
            line-height: @height;
            font-size: 1rem;
            text-align: left;
            outline: none;
        }
    }

    .confirm-btn {
        @height: 2rem;
        height:  @height;
        width: 50%;
        line-height: @height;
        background-color: #238FFF;
        font-size: 0.8rem;
        text-align: center;
        border-radius: 1.08rem;
        margin: 1rem auto auto;
        color: white;
    }


</style>

<template>
    <div class="changeinfo-container">
        <div class="change-con">
            <input class="change-item" v-model="value" value="value">
        </div>
        <div class="confirm-btn" @click="submit">确定</div>
    </div>
</template>

<script>
    import {loginModules} from "@/utils/apiManager/loginApi";
    import {userInfo} from "../../../../../utils/userInfo/user";
    import {errorCode} from "../../../../../utils/errorCode/errorCode";

    export default {
        name: 'changeInfo',

        data() {
            return {
                value: '',
                module: ''
            }
        },

        onLoad(options) {
            this.value = options.value
            this.module = options.module
        },

        methods: {
            submit() {
                loginModules.changeUserInfo(this.formatData()).then(res => {
                    if (res.code == 1) {
                        userInfo.Info[this.module] = this.value
                        uni.navigateBack()
                    } else {
                        errorCode(res)
                    }
                })
            },
            formatData() {
                //nickname:"笔名",
                //signature:"签名",
                //city:"广东省广州市",
                //mail":"123@qq.com"
                let data = {}
                data[this.module] = this.value
                switch (this.module) {
                    case 'nickname': {
                        return data
                    }
                    case 'signature': {
                        return data
                    }
                    case 'city': {
                        return data
                    }
                    case 'mail': {
                        return data
                    }
                }
            }
        }
    }
</script>


