<style scoped lang="less">
    .style-con {
        height: 2.5rem;
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: center;
        .style-content {
            height: 100%;
            width: 20%;
            border: 1px solid black;
            text-align: center;
            line-height: 2.5rem;
            margin-right: 0.3rem;
            font-size: 0.8rem;
        }
    }

    .envelope {
		display: block;
        height: 10rem;
        width: 90%;
		margin: auto;
		margin-top: 2rem;
    }
	
	.envelope-image {
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		right: 1.5rem;
		bottom: 6rem;
		height: 2.5rem;
		width: 2.5rem;
		border-radius: 50%;
		background-color: #ffc300;
		overflow: hidden;
		
		image {
			height: 2rem;
			width: 2rem;
		}
		
	}


</style>

<template>
    <view class="letter-container">
		<view class="envelope-image" style="bottom: 10rem;" @click="confirm">
			<image			        
				src="http://printer.noerror.xyz/appImage/gou.png"
			>
			</image>
		</view>
        <view class="bottom-con">
            <view class="style-con">
                <view class="style-content" v-for="item in styleList" @click="submitId(item.paper)">{{item.paper}}</view>
            </view>
            <image class="envelope" src="../../../../../static/letter/envelope.png"></image>
        </view>
    </view>
</template>

<script>
    import {stamp} from "@/utils/stampStyle/stampStyle";
	import {letterInformation} from "@/utils/userInfo/letterInfo"

    export default {
        name: 'envelope',
        data() {
            return {
                styleList: [
                    {
                        styleName: '样式1',
                        paper: '貌美如花'
                    },
                ],

            }
        },


        mounted() {
            this.stampList = stamp
        },

        methods: {
            confirm() {
                uni.navigateTo({
                	url: '../submitEnvelope/submitEnvelope'
                })
				letterInformation.info.paper = '貌美如花'
            },

        }


    }
</script>


