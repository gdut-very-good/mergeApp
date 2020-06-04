<style scoped lang="less">
    .leaving {
        width: 90%;
        margin: auto;

        textarea {
            height: 10rem;
            font-size: 1rem;
            overflow: scroll;
        }
    }

    .leaving-con {
        height: 2rem;
        border-bottom: 1px solid gainsboro;
        line-height: 2rem;
    }

    .submit-btn {
        height: 2rem;
        width: 80%;
        margin: auto;
        background-color: #6e68c5;
        line-height: 2rem;
        font-size: 0.8rem;
        color: white;
        border-radius: 6px;
        text-align: center;
    }

</style>

<template>
    <view class="leaving">
        <view class="leaving-con">留言</view>
        <textarea maxlength="250" placeholder="写点留言" v-model="content"></textarea>
        <view class="submit-btn" @click="submit">提交留言</view>
    </view>
</template>

<script>
    import {letter} from "@/utils/apiManager/letterApi";
    import {errorCode} from "@/utils/errorCode/errorCode";

    export default {
        name: 'leaving',

        data() {
            return {
                treeId: '',
                content: '',
            }
        },

        computed: {},

        onLoad(options) {
            this.treeId = options.id
        },

        methods: {
            submit() {
                const data = {
                    "treeHoleId": this.treeId,
                    "content": this.content,
                }
                letter.submitLeaving(data).then(res => {
                    if (res.code == 1) {
                        uni.showToast({
                            title: '留言成功'
                        })
                        setTimeout(() => {
                            uni.navigateBack({
                                delta: 1
                            })
                        }, 500)
                    } else {
                        errorCode(res)
                    }
                })
            }
        }
    }
</script>

