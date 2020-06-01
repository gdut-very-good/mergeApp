<template>
    <view class="wrapper IslandPageView">
        <view class="header-box">
            <input type="text" placeholder="搜索海岛" @focus="inputFocus" @blur="inputBlur" class="input">
            <button class="button">{{buttonMsg}}</button>
        </view>
        <view class="container-box" style="">
            <view class="avatar-box">
                <image :src=" myInfo.photo" class="avatar"></image>
            </view>
            <view class="rua-box" @click="toIsland(myInfo.userId)">
                <text class="first">我的海岛</text>
                <text class="second">{{myInfo.signature || 'rua'}}</text>
            </view>
        </view>
        <view class="container">
             <island-item v-for="(data, index) in [1,2,3]" v-bind="data"/>
        </view>
    </view>


</template>

<script lang="js">
    // import Title from "@/components/title/Title";
	import IslandItem from "../../../components/islandItem/IslandItem";
	// import Api from "@/utils/apiManager/Api";
    // this.$store.default.state.imageBaseUrl +
	export default {
    	name : "IslandPage",
		components: {
    		IslandItem
        },
        data() {
    		return {
    			buttonMsg : '漂流',
                myInfo : {},
                starIsland : []
            }
        },
        methods : {
			inputFocus() {
				this.buttonMsg = '搜索'
            },
            inputBlur() {
				this.buttonMsg = '漂流'
            },
            toIsland(userId) {
				this.$router.push({
					name : 'detail',
					query : {
						userId
					}
				})
            }
        },
        mounted() {
    		// Api.get(`/user/${1}`).then((data) => {
    		// 	this.myInfo = data;
            // });
    		// Api.get("/star").then((data) => {
    		// 	console.log(data);
            //     this.starIsland = data.records;
			// });
		}
	}
</script>

<style scoped lang="less">
    @import "IslandPage";
</style>
