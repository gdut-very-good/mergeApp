<style scoped lang="less">
    .card-item {
        height: 10rem;
        width: 80%;
        border: 1px solid black;
        margin: 0.5rem auto auto;

        .shudong-title {
            @titleHeight: 2rem;
            height: @titleHeight;
            line-height: @titleHeight;
            text-align: center;
            font-size: 0.8rem;
        }

        .shudong-content {
            max-height: 3.5rem;
            overflow: scroll;
            width: 90%;
            margin: 0 auto;
            font-size: 0.8rem;
        }
    }
</style>

<template>
    <div>
        <div class="bottom-con">
            <div class="card-item" v-for="item in list">
                <div class="shudong-title">{{item.title}}</div>
                <div class="shudong-content">{{item.content}}</div>
            </div>
        </div>
    </div>
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


