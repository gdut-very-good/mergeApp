<template>
    <view class="wrapper IslandDetailView" style="position: relative">
<!--        <input type="file" ref="fileInput" @change="handleFileChange" style="display: none">-->
        <view class="header" v-show="!ruaVisibility">
            <view class="bg" :style="{
				'background-image' : `url(${'rua'})`,
				'background-size' : 'cover',
				'max-height' : '300px'
            }" @click="fileUpload"></view>
            <view class="container">
                <view class="avatar-box">
                    <!-- this.$store.default.state.imageBaseUrl +  -->
                    <image :src="this.imageUrl + userInfo.photo" alt="" class="avatar"/>
                    <text class="name">{{userInfo.username}}</text>
                </view>
<!--                <view class="content">-->
<!--                    {{userInfo.signature}}-->
<!--                </view>-->
            </view>
        </view>
        <view class="body" v-show="!ruaVisibility">
            <Post v-for="(data, index) in postList" v-bind="data"/>
        </view>
        <view class="pos" @click="ruaVisibility = true" v-show="!ruaVisibility && showAdd" style="
            width: 60px; height: 60px; position: fixed;
            z-index: 1; bottom: 60px; right: 20px;
            background: #ffffff; display: flex;
            flex-direction: row; justify-content: center; align-items: center;
            border-radius: 50%;
            ">
            <image src="https://s1.ax1x.com/2020/05/17/YRITQU.png" style="width: 100%; height: 100%"/>
        </view>
        <view class="rua-box" v-show="ruaVisibility" style="
            position: fixed;
            top: 0; left: 0; right: 0;
            bottom: 0px;
            background: #ffffff;
            "
        >
            <view class="rua">
                <view class="top">
                    <view class="box">
                        <text class="span" @click="ruaVisibility = false">×</text>
                        <text class="post">发布动态</text>
                    </view>
                    <button class="button" @click="post">发布</button>
                </view>
                <textarea rows="8" v-model="content" placeholder="写下你的想法" style="
                    padding: 0 16px; box-sizing: border-box;
                    font-size: 18px"></textarea>
            </view>
        </view>
    </view>


</template>

<script lang="js">
    import Post from "../../../../components/post/Post.vue";
	import Api from "../../../../utils/apiManager/Api";
	import {userInfo} from "../../../../utils/userInfo/user";
	import {myApi} from "../../../../utils/apiManager/myApi";
    export default {
        name : "IslandDetail",
        components: {Post},
        data() {
        	return {
                bg : "https://300img.rcywl.com/300data/res/ui/hero/233.bmp!300patch",
                avatar : "https://img.nga.178.com/attachments/mon_201801/29/3gQ5-icl2Z1fT3cSm8-m8.jpg",
				ruaVisibility : false,
                userInfo : {},
                postList : [{}, {}, {}],
                userId : 0,
				content : '',
                myInfo : {}
            }
        },
        computed : {
            showAdd() {
            	console.log(this.userInfo.userId === this.myInfo.userId);
            	return this.userInfo.userId === this.myInfo.userId;
            }
        },
        methods : {
        	post() {
                Api.post("/post/", {
                	content : this.content
                }).then((res) => {
					Api.get(`/post/all/${this.userId}`).then(({data}) => {
						this.postList = data;
					});
					this.ruaVisibility = !this.ruaVisibility;
                })
            },
            handleFileChange(e) {
        		let file = e.target.files[0];
        		console.log(file);
        		Api.upload('/user/upload/background', {
					file
                }).then((res) => {
                    console.log(res);
                });
            },

			changeImage() {
        		console.log(this.$refs);
                this.$refs.fileInput.$el.click();
            },
			fileUpload() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function (res) {
						const tempFilePaths = res.tempFilePaths[0];
						console.log(tempFilePaths);
						// const tempFilePaths = 'file:http://192.168.1.109:8080/b548e24e-b604-4b81-95a5-871cb3c26d36'
						console.log(tempFilePaths);
						console.log(typeof tempFilePaths);
						Api.upload('/user/upload/background',tempFilePaths).then(res => {
							console.log(res);
							if (res.code === 1) {
								uni.showToast({
									title: '上传成功',
									icon: 'none'
								})
							}
						})
					}
				});
			},
        },
        mounted() {
        	this.userId = this.$route.query.userId;
        	Api.get(`/user/${this.userId}`).then(({data}) => {
        		this.userInfo = data;
        		this.myInfo = userInfo.Info;
            });
        	Api.get(`/post/all/${this.userId}`).then(({data}) => {
        		this.postList = data;
            });

		}
	}
</script>

<style scoped lang="less">
    @import "IslandDetailView";
</style>

<style lang="less">
    #blockbyte-bs-indicator {
        display: none!important;
    }

</style>
