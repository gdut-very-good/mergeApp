<template>
    <div class="wrapper PostView" @click="toPostView">
        <div class="content">{{content}}</div>
        <div class="box">
            <text class="time">{{time}}</text>
            <text class="reply">{{view}}</text>
        </div>
    </div>

</template>

<script lang="js">
    import PostDetail from "../../pages/index/islandPage/IslandDetail/postDetail/PostDetail";
	export default {
        name : "Post",
		components: {PostDetail},
		props : {
        	content : {
        		default : "这是我写的一个帖子，帖子内容是这样的帖子内容是这样的帖子内容是这样的帖子内容是这样的帖子内容是这样的帖子内容是这样的"
            },
            time : {
        		default: "00:00"
            },
            view : {
        		default : "12"
            },
            userId : {
        		require : true
            },
            postId : {
        		require : true
            }
        },
        methods : {
			toPostView() {
				uni.navigateTo({
					url: `postDetail/PostDetail?postId=${this.postId}`,
					fail(res) {
						console.log(res)
					}
				});
            }
        }
    }
</script>

<style scoped lang="less">
    @px2rem : 1 / 54rem;
    .PostView {
        margin-top: 10 * @px2rem;
        padding: 0 10 * @px2rem;
        border: #222210 solid 2 * @px2rem;
        margin-bottom: 10px;
        .content {
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp : 999;
            -webkit-box-orient: vertical;
            max-height: 666px;
            font: inherit;
            line-height: 1.5em;
        }
        .box {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            .time {
                margin-top: 18 * @px2rem;
                font-size: 15px;
                margin-bottom: 10 * @px2rem;
            }
            .reply {
                margin-top: 18 * @px2rem;
                font-size: 15px;
                margin-bottom: 10 * @px2rem;
            }
        }
    }
</style>
