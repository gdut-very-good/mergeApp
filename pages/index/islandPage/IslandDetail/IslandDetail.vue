<template>
    <view class="wrapper IslandDetailView" style="position: relative">
<!--        <input type="file" ref="fileInput" @change="handleFileChange" style="display: none">-->
        <view class="header" v-show="!ruaVisibility">
            <view class="bg" :style="{
				'background-image' : `url(${this.userInfo ? this.imageUrl + this.userInfo.background : ''})`,
				'background-size' : 'cover',
				'max-height' : '300px'
            }" @click="fileUpload"></view>
            <view class="container">
                <view class="avatar-box">
                    <!-- this.$store.default.state.imageBaseUrl +  -->
                    <image :src="this.imageUrl + userInfo.photo" alt="" class="avatar" @click="popView"/>
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
        <view class="pos" v-show="!ruaVisibility" style="
            width: 60px; height: 130px; position: fixed;
            z-index: 1; bottom: 60px; right: 20px;
            display: flex;
            flex-direction: column; justify-content: center; align-items: center;
            border-radius: 50%;
            ">
            <image :src="starSet.has(this.userInfo.userId) ? 'https://s1.ax1x.com/2020/06/03/taGns0.png' : 'https://s1.ax1x.com/2020/06/03/taGmMq.png'" style="
                width: 60px; height: 60px; margin-bottom: 10px; background: #ffffff;"
                   @click="star" v-show="this.userInfo.userId !== this.myInfo.userId && this.userInfo.userId && this.myInfo.userId"
            ></image>
            <image src="https://s1.ax1x.com/2020/05/17/YRITQU.png" style="
                width: 60px; height: 60px; background: #ffffff; " @click="ruaVisibility = true"
                   v-show="showAdd"
            />
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
        <view class="mask" v-show="showMask">
            <view class="container rua">
                <view class="close" @click="showMask = false">×</view>
                <view>
                    <view class="item avatar-box">
                        <image :src="imageUrl + userInfo.photo"  style="width: 60px; height: 60px" class="avatar"></image>
                    </view>
                    <view class="item">
                        <view class="key">用户名</view>
                        <text class="val">{{userInfo.username}}</text>
                    </view>
                    <view class="item">
                        <view class="key">签名</view>
                        <text class="val">{{userInfo.signature}}</text>
                    </view>
                    <view class="item">
                        <view class="key">地点</view>
                        <text class="val">{{userInfo.city}}</text>
                    </view>
<!--                    <view class="btn-box">-->
<!--                        <view class="btn">加为笔友</view>-->
<!--                    </view>-->
                </view>
            </view>
        </view>
    </view>


</template>

<script lang="js">
    import Post from "../../../../components/post/Post.vue";
	import Api from "../../../../utils/apiManager/Api";
	import {userInfo} from "../../../../utils/userInfo/user";
	import {myApi} from "../../../../utils/apiManager/myApi";
	// https://s1.ax1x.com/2020/06/03/taGmMq.png
	// https://s1.ax1x.com/2020/06/03/taGns0.png
    export default {
        name : "IslandDetail",
        components: {Post},
        data() {
        	return {
                bg : "https://300img.rcywl.com/300data/res/ui/hero/233.bmp!300patch",
                avatar : "https://img.nga.178.com/attachments/mon_201801/29/3gQ5-icl2Z1fT3cSm8-m8.jpg",
				ruaVisibility : false,
                userInfo : {},
                postList : [],
                userId : 0,
				content : '',
                myInfo : {},
				starIsland : [],
                showMask : false
            }
        },
        computed : {
            showAdd() {
            	console.log(this.userInfo.userId === this.myInfo.userId);
            	return this.userInfo.userId === this.myInfo.userId && this.myInfo.userId && this.userInfo.userId;
            },
            starSet() {
            	return new Set(this.starIsland.map(island => island.userId))
            }
        },
        methods : {
        	post() {
                Api.post("/post/", {
                	content : this.content
                }).then((res) => {
					this.ruaVisibility = !this.ruaVisibility;
					this.$nextTick(() => {
						Api.get(`/post/all/${this.userId}`).then(({data}) => {
							this.postList = data;
						});
                    });
                })
            },
			star() {
                Api.post("/star/", {
                	islandId : this.userInfo.userId
                }).then((res) => {
                	if (res.code === "1") {
						Api.get("/star").then(({data}) => {
							this.starIsland = data.records;
						});
                    } else {
                		uni.showToast({
                            title : res.message,
                            icon : 'none'
                        })
                    }
                })
            },
			changeImage() {
        		console.log(this.$refs);
                this.$refs.fileInput.$el.click();
            },
			fileUpload() {
				if (!this.showAdd) {
					return;
				}
				let vm = this;
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
						Api.upload('/user/upload/background',tempFilePaths).then(({data}) => {
							vm.userInfo.background = data;
							if (data.code === 1) {
								uni.showToast({
									title: '上传成功',
									icon: 'none'
								})
							}
						})
					}
				});
			},
			popView() {
        		this.showMask = true;
            },
            apply() {

            }
        },

		onLoad(options) {
			console.log(options);
			this.userId = options.userId;
			Api.get(`/user/${this.userId}`).then(({data}) => {
				console.log(data);
				this.userInfo = data;
				this.myInfo = userInfo.Info;
			});
			Api.get(`/post/all/${this.userId}`).then(({data}) => {
				this.postList = data;
			});
			Api.get("/star").then(({data}) => {
				this.starIsland = data.records;
			});
		},
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
