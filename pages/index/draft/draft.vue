<template>
    <view class="wrapper draftPageView">
        <view class="header">草稿箱</view>
        <view class="container">
            <view class="title">共{{draftData.length}}条草稿</view>
            <view class="body">
                <view class="box" v-for="(draft, index) in draftData" :key="index" @click="edit(draft)">
                    <view class="title">{{draft.header || 'paper'}}</view>
                    <view class="preview-content">{{draft.content || '内容'}}</view>
                    <text class="time">{{draft.sendTime || '2020-11-13'}}</text>
                    <text class="delete" @click="deleteDraft(draft)">×</text>
<!--                    <letter></letter>-->
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="js">
	import Api from "../../../utils/apiManager/Api";
	import Letter from "../letter/letter/letter";
	import {updateDraftInfo} from "../../../utils/draftInfo/info";
	export default {
		components: {Letter},
		data() {
        	return {
				draftData : []
            }
        },
        async mounted() {
			let data = await Api.get("/letter/draft");
			this.draftData = data.data;
		},
        methods : {
			deleteDraft({letterId}) {
                Api.delete(`/letter/${letterId}`).then(async (res) => {
					let data = Api.get("/letter/draft");
					this.draftData = data.data;
                })
            },
			edit(draft) {
				updateDraftInfo(draft);
				uni.navigateTo({
					url : `../letter/letter/letter?letterId=${draft.letterId}`,
					fail(res) {
						console.log(res)
					}
				});
            }
        },

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
                font-size: 15px;
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
                    padding-right: 60 * @px2rem;
                    margin-bottom: 2 * @px2rem;
                    background: #ffffff;
                    > .title {
                        font-size: 17px;
                        color: rgb(51, 51, 51);
                        margin-bottom: 5 * @px2rem;
                        margin-top: 10 * @px2rem;
                    }
                    > .preview-content {
                        font-size: 15px;
                        color: rgb(148, 148, 148);
                        margin-bottom: 8 * @px2rem;
                    }
                    > .time {
                        font-size: 15px;
                        color: rgb(161, 161, 161);
                        position: absolute;
                        right: 80 * @px2rem;
                        top: 14 * @px2rem;
                    }
                    > .delete {
                        position: absolute;
                        z-index: 10;
                        right: 5px;
                        top: 50%;
                        transform: translateY(-50%);
                        font-size: 25px;
                        padding: 0 5px;
                        color: grey;
                    }
                }
            }
        }
    }
</style>
