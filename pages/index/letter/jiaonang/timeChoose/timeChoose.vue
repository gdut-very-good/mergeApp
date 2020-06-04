<style scoped lang="less">
	.time-con {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh;
		background-color: #d8d8d8;
	}
	
	.future {
		margin-right: 2rem;
		border-bottom: 5px solid grey;
	}
	
	.uni-input {
		border-bottom: 5px solid grey;
	}
	
	.submit-btn {
		position: fixed;
		bottom: 10rem;
		right: 2rem;
		height: 2.5rem;
		width: 2.5rem;
		border-radius: 50%;
		background-color: #ffc300;
		display: flex;
		align-items: center;
		justify-content: center;
		
		.save-image {
			height: 1.5rem;
			width: 1.5rem;
			border-radius: 50%;
		}
	}
    
	

</style>

<template>
    <view class="time-con">
		<view class="submit-btn"  @click="submit">
			<image class="save-image" src="http://printer.noerror.xyz/appImage/gou.png"></image>
		</view>
		<view class="future">未来的某个时候</view>
		<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
		    <view class="uni-input">{{date}}</view>
		</picker>
    </view>
</template>

<script>
	import {jiaoInfo} from "@/utils/userInfo/jiaonang" 
	import {letter} from "@/utils/apiManager/letterApi"
	import {errorCode} from "@/utils/errorCode/errorCode"
    export default {
		name: "timeChoose",
		
		data() {
			const currentDate = this.getDate({
			    format: true
			})
			return {
				date: currentDate,
				time: '12:01'	
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
				jiaoInfo.info.receiveTime = this.date + ' 00:00:00'
				console.log(jiaoInfo.info)
				letter.submitDate(jiaoInfo.info).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: "提交成功"
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 2
							})
						}, 1000)
					} else {
						errorCode(res)
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
			},
			
			bindDateChange(e) {
				console.log(e.target.value)
				this.date = e.target.value
				console.log(this.date)
			}
		}
       
    }
</script>


