<template>
    <view class="wrapper draftPageView">
        <view class="header">草稿箱</view>
        <view class="container">
            <view class="title">共{{draftData.length}}条草稿</view>
            <view class="body">
                <view class="box" v-for="(draft, index) in draftData" :key="index">
                    <text class="title">{{draft.paper}}</text>
                    <text class="preview-content">{{draft.content}}</text>
                    <text class="time">{{draft.sendTime}}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="js">
	import {Request} from "../../../utils/apiManager/request";
	export default {
		data() {
        	return {
				draftData : []
            }
        },
        async mounted() {
			this.draftData = await Request.get("/letter/draft");
			let data = await Request.get("/star");
			console.log(data);

		}

	}
</script>

<style scoped lang="less">
    @px2rem : 1 / 35rem;
    .draftPageView.wrapper {
        background-color: rgb(242, 242, 242);
        .header {
            font-size: 27 * @px2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 66 * @px2rem;
            margin-bottom: 4 * @px2rem;
            background: #ffffff;
            color: rgb(51, 51, 51);
        }
        .container {
            > .title {
                font-size: 16 * @px2rem;
                text-align: right;
                box-sizing: border-box;
                padding-right: 30 * @px2rem;
                padding-top: 15 * @px2rem;
                padding-bottom: 16 * @px2rem;
                background: #ffffff;
            }
            .body {
                display: flex;
                flex-direction: column;
                .box {
                    box-sizing: border-box;
                    position: relative;
                    padding-left: 25 * @px2rem;
                    padding-right: 40 * @px2rem;
                    margin-bottom: 2 * @px2rem;
                    background: #ffffff;
                    > .title {
                        font-size: 20 * @px2rem;
                        color: rgb(51, 51, 51);
                        margin-bottom: 5 * @px2rem;
                        margin-top: 10 * @px2rem;
                    }
                    > .preview-content {
                        font-size: 20 * @px2rem;
                        color: rgb(148, 148, 148);
                        margin-bottom: 8 * @px2rem;
                    }
                    > .time {
                        font-size: 15 * @px2rem;
                        color: rgb(161, 161, 161);
                        position: absolute;
                        right: 40 * @px2rem;
                        top: 14 * @px2rem;
                    }
                }
            }
        }
    }
</style>
