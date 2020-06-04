<template>
    <view class="wrapper PostDetailView">
        <view class="post-box">
            <view class="avatar-container">
                <view class="left">
                    <view class="avatar-box">
                        <image :src="imageUrl + userInfo.photo" class="avatar"/>
                        <text class="name">{{userInfo.username || 'Tom'}}</text>
                    </view>
                </view>
<!--                <view class="right">-->
<!--                    <button class="comment-button">+</button>-->
<!--                </view>-->
            </view>
            <view class="content">
                {{postDetail ? postDetail.content : '这是一条动态这是一条动态这是一条动态这是一条动态这是一条动态'}}
            </view>
        </view>
        <view class="comment-box" v-show="inputVisibility">
            <view class="comment" v-for="(comment, index) in commentData" :key="index">
                <view class="avatar-box">
                    <img :src="imageUrl + comment.replyPhoto" alt="" class="avatar"/>
                </view>
                <view class="content">
                    <view class="top">
                        <text class="name">{{comment.replyName}} {{comment.beReplyName ? ' 回复 ' + comment.beReplyName : ''}}</text>
                        <button class="reply" @click="reply(comment)">回复</button>
                    </view>
                    <view class="bottom">
                        <text class="content">{{comment.reply.content}}</text>
                    </view>
                </view>
            </view>
        </view>
        <view class="input-box">
            <view style="
                color: grey;
                border: 1px solid #4d4d4d;
                padding: 5px 8px;
            " @click="onInputFocus" v-show="inputVisibility">
                写评论
            </view>
<!--            <input placeholder="写评论" :value="''" @focus="onInputFocus" v-show="inputVisibility"/>-->
        </view>
        <view class="rua-box" v-show="!inputVisibility" style="margin-top: 20px; ">
            <view class="rua">
                <view class="top">
                    <view class="box">
                        <text class="span" @click="inputVisibility = true">×</text>
                        <text class="post">发表评论</text>
                    </view>
                    <button class="button" @click="post">发布</button>
                </view>
                <textarea rows="8" v-model="inputVal" placeholder="写下你的想法" style="padding: 0 16px; box-sizing: border-box; font-size: 18px"></textarea>
            </view>
        </view>
    </view>

</template>

<script lang="js">
    // import Api from "@/utils/apiManager/Api";

	import Api from "../../../../../utils/apiManager/Api";

	export default {
    	name : "postDetail",
        data() {
    		return {
				inputVal : "",
                inputVisibility : true,
                postDetail : {},
                userInfo : {
					photo : ''
				},
				commentData : [],
                beReplyId : 0,
				postId : 0
            }
        },
        props : {
    		avatar : {
    			default : "https://img.moegirl.org/common/c/c5/Winner-amethyst-2018.png"
            }
        },
        methods : {
    		reply(comment) {
    			console.log(comment);
				this.beReplyId = comment.reply.replyId;
                this.inputVisibility = false;
            },
			onInputFocus() {
                this.inputVisibility = false;
            },
			post() {
				this.inputVisibility = true;
				console.log(this.beReplyId);
				Api.post('/reply/', {
                    beReplyId : this.beReplyId ? this.beReplyId : null,
                    content : this.inputVal,
                    postId : this.postId
                }).then(() => {
					Api.get(`/reply/post/${this.postId}`).then(({data}) => {
						this.commentData = data;
					});
					this.inputVal = "";
					uni.showToast({
                        title : '回复成功'
                    })
                });
            }
        },
		onLoad(options) {
			let posterId = options.postId;
			this.postId = posterId;
			Api.get(`/post/${posterId}`).then(({data}) => {
				this.postDetail = data;
				console.log(data);
				Api.get(`/user/${data.userId}`).then(({data}) => {
					this.userInfo = data;
					console.log(this.userInfo)
				});
			});
			Api.get(`/reply/post/${posterId}`).then(({data}) => {
				this.commentData = data || [];
			})
		},
	}
</script>

<style scoped lang="less">
    @import "PostDetail";
</style>
