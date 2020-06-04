<style scoped lang="less">
    .card-item {
        width: 80%;
        border: 1px solid black;
        margin: 0.5rem auto auto;
        padding-bottom: 1rem;

        .shudong-title {
            @titleHeight: 2rem;
            height: @titleHeight;
            line-height: @titleHeight;
            text-align: center;
            font-size: 0.8rem;
        }

        .shudong-content {
            min-height: 6.5rem;
            overflow: scroll;
            width: 90%;
            margin: 0 auto;
            font-size: 0.8rem;
        }

        .creator {
            width: 90%;
            margin: auto;
            height: 1rem;
            line-height: 1rem;
            text-align: right;
            font-size: 0.8rem;
        }

        .time {
            .creator;
        }
    }
</style>

<template>
    <view>
        <view class="bottom-con">
            <view class="card-item" v-for="item in list">
                <view class="shudong-title">{{item.title}}</view>
                <view class="shudong-content">{{item.content}}</view>
                <view class="creator">荒于其</view>
                <view class="time">2020:222</view>
            </view>
        </view>
    </view>
</template>

<script>
    import {letter} from "@/utils/apiManager/letterApi";

    export default {
        name: 'jiaonangList',
        data() {
            return {
                list: []
            }
        },
        mounted() {
            console.log('重新请求数据')
            this.getList()
        },
        methods: {
            getList() {
                letter.getHoleList().then(res => {
                    console.log(res)
                    this.list = res.data.records
                })
            }
        }

    }
</script>


