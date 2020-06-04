<template>
    <view class="wrapper IslandPageView">
        <view class="header-box">
            <input type="text" v-model="inputVal" placeholder="搜索海岛" class="input" @keyup.enter="handleClick">
            <button class="button" @click="handleClick">{{buttonMsg}}</button>
        </view>
        <view class="container-box" style="">
            <view class="avatar-box">
                <image :src="this.imageUrl + myInfo.photo" class="avatar"></image>
            </view>
            <view class="rua-box" @click="toIsland(myInfo.userId)">
                <text class="first">我的海岛</text>
                <text class="second">{{myInfo.signature || 'rua'}}</text>
            </view>
        </view>
        <view class="container">
             <island-item v-for="(data, index) in starIsland" v-bind="data"/>
        </view>
    </view>


</template>

<script lang="js">
    // import Title from "@/components/title/Title";
	import IslandItem from "../../../components/islandItem/IslandItem";
	import Api from "../../../utils/apiManager/Api";
	import {userInfo} from "../../../utils/userInfo/user";
	import {myApi} from "../../../utils/apiManager/myApi";
    // this.$store.default.state.imageBaseUrl +
	export default {
    	name : "IslandPage",
		components: {
    		IslandItem
        },
        data() {
    		return {
                myInfo : {},
                starIsland : [],
				inputVal : ""
            }
        },
        computed : {
			buttonMsg() {
				return this.inputVal.length ? '搜索' : '漂流'
            }
        },
        methods : {
    		async handleClick() {
                if(this.buttonMsg === '漂流') {
                    let {data} = await Api.get("/user/random");
					uni.navigateTo({
						url : `IslandDetail/IslandDetail?userId=${data.userId}`
					})
                } else {
                	console.log(this.inputVal);
                    if (this.inputVal) {
						uni.navigateTo({
							url : `search/search?wd=${this.inputVal}`
						})
                    }
                }
            },
			inputFocus() {
				// this.buttonMsg = '搜索'
            },
            inputBlur() {
				// this.buttonMsg = '漂流'
            },
            toIsland(userId) {
				uni.navigateTo({
                    url : `IslandDetail/IslandDetail?userId=${userId}`
                })
            },

        },
		onShow() {
    		Api.get(`/user/${userInfo.Info.userId}`).then(({data}) => {
    			console.log(data);
    			this.myInfo = data;
            });
    		Api.get("/star").then(({data}) => {
    			console.log(data);
                this.starIsland = data.records;
			});
    		console.log(this)
		}
	}
</script>

<style scoped lang="less">
    @import "IslandPage";
</style>
