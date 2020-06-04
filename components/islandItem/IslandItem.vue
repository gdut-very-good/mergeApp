<template>
    <view class="wrapper IslandItemView" :style="{
    	color : 'red',
    	width : this.widthStyle,
    	marginBottom : this.verticalSpace + 'px'
    }" @click="toDetail">
        <view class="container" :style="{
            	// backgroundImage : `url(${this.background ? this.$store.default.state.imageBaseUrl + this.background : this.$store.default.state.defaultImageUrl})`,
            	'background-image' : `url(${this.imageUrl + background})`,
            	'background-size' : 'cover'
            }">
            <view class="content">
                {{signature}}
            </view>
        </view>
        <view class="name">
            {{username}}的海岛
        </view>
<!--        <island-detail></island-detail>-->
    </view>

</template>

<script lang="js">
    import IslandDetail from "../../pages/index/islandPage/IslandDetail/IslandDetail";
	export default {
        name : 'IslandItem',
		components: {IslandDetail},
		props : {
        	countInLine : {
                default : 2
            },
			horizontalSpace : {
                default : 17
            },
			verticalSpace : {
                default : 22
            },
            username : {
                default : "Tom"
            },
            signature : {
                default: "海岛描述就是这个样子啦海岛描述就是这个样子啦"
            },
            background : {
                default : "https://steamuserimages-a.akamaihd.net/ugc/918046970938426905/741086CE39C3AA0AD09AED02FF67D1285C066C07/?imw=1024&imh=577&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"
            },
            userId : {
        		require : true
            },
            photo : {

            }
        },
        computed : {
        	widthStyle() {
        		let str = `calc((100% - ${(this.countInLine - 1) * this.horizontalSpace}px) / ${this.countInLine})`
                return str;
            }
        },
        mounted() {
        	console.log(this.widthStyle);
        	console.log(this.userId);
        	// console.log(this.$store.default.state.constants.imageBaseUrl);
		},
        methods : {
        	toDetail() {
        		// console.log(this.userId);
        		// this.$router.push({
                //     name : 'detail',
                //     query : {
                //     	userId : this.userId
                //     }
                // })
				uni.navigateTo({
					url: `/pages/index/islandPage/IslandDetail/IslandDetail?userId=${this.userId}`,
					fail(e) {
						console.log(e);
					}
				})

            }
        }
	}
</script>

<style scoped lang="less">
    @px2rem : 1 / 54rem;
    .IslandItemView {
        border: #000 1px solid;
        .container {
            height: 100px;
            box-sizing: border-box;

            .content {
                box-sizing: border-box;
                padding: 0 5px;
                height: 100%;
                color: #ffffff;
                font: inherit;
                line-height: 1.5em;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                background-color: rgba(0,0,0, 0.3);
                font-size: 16px;
            }
        }
        .name {
            height: 90 * @px2rem;
            font-size: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: black;

        }
    }
</style>
