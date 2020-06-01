<style scoped lang="less">
    .shudong-second-title {
        @height: 2.5rem;
        height: @height;
        line-height: @height;
        width: 95%;
        margin: auto;
        font-size: 1rem;
        border-bottom: 1px solid gainsboro;
    }

    .text-area textarea{
        height: 50vh;
        width: 95%;
        margin: 0.3rem auto auto;
        font-size: 1rem;
    }
	
	.submit-btn {
		position: fixed;
		bottom: 15rem;
		right: 2rem;
		height: 2.5rem;
		width: 2.5rem;
		border-radius: 50%;
		background-color: rgb(203,176,68);
		display: flex;
		align-items: center;
		justify-content: center;
		
		.save-image {
			height: 1.5rem;
			width: 1.5rem;
			border-radius: 50%;
		}
	}
	
	.mpvue-picker-view {
		position: fixed;
		bottom: 0;
	    width: 100%;
	    height: 10rem;
	    background-color: white-space;
		color: black;
		border-top: 1px solid black;
	            
	    .item {
			text-align: center;
	        width: 100%;
	        height: 88upx;
	        line-height: 88upx;
	        text-overflow: ellipsis;
	        white-space: nowrap;
	        font-size: 40upx;
	    }
	}
	

</style>

<template>
    <view>
		<view class="submit-btn"  @click="submit">
			<image class="save-image" src="http://printer.noerror.xyz/appImage/gou.png"></image>
		</view>
        <view class="bottom-con">
            <input class="shudong-second-title" v-model="header" placeholder="标题"></view>
            <view class="text-area">
                <textarea placeholder="写下你想对明天的你说的话吧..." id="" cols="30" rows="10" v-model="content"></textarea>
            </view>
        </view>
    </view>
</template>

<script>
	import {jiaoInfo} from "@/utils/userInfo/jiaonang"
    export default {
        name: "jiaonang",
		
		data() {
			return {
				header: '',
				content: ''
			}
		},
		
		computed: {
		    startDate() {
				return this.getDate('start');
		    },
		    endDate() {
		        return this.getDate('end');
		    }
		},
		
		methods:{
			submit() {
				jiaoInfo.info.header = this.header
				jiaoInfo.info.content = this.content
				
				console.log(jiaoInfo.info)
				
				uni.navigateTo({
					url: './timeChoose/timeChoose',
					fail(res) {
						console.log(res)
					}
				})
			},
			getDate(type) {
			    const date = new Date();
			    let year = date.getFullYear();
			    let month = date.getMonth() + 1;
			    let day = date.getDate();
			
		        if (type === 'start') {
			        year = year - 60;
			    } else if (type === 'end') {
			        year = year + 2;
			    }
			    month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
			    return `${year}-${month}-${day}`;
			}
		}
       
    }
</script>


