<style scoped lang="scss">
	.friend-container {
		width: 100%;
	}
	
	.pingyin-container {
		height: 1.5rem;
		background-color: red;
		line-height: 1.5rem;
	}
	
	.friend-list-container {
		height: 2.5rem;
	}
	
	.inner-container {
		display: flex;
		flex-direction: row;
		height: 100%;
		padding-left: 1rem;
	}
	
	.head-image {
		height: 2.5rem;
		width: 2.5rem;
		background-color: green;
		border-radius: 50%;
		margin-right: 0.5rem;
	}
	
	.right-bar {
		height: 100%;
		width: 75%;
	}
	
	.name {
		display: flex;
		align-items: center;
		height: 50%;
	}
	
	.city {
		display: flex;
		align-items: center;
		height: 50%;
	}
	
	.head-icon {
		height: 1.5rem;
		width: 1.5rem;
	}
    
</style>

<template>
    <view class="friend-container">
		<view class="pingyin-container">
			<view class="inner-container">
				A
			</view>
		</view>
		<view class="friend-list-container">
			<view class="inner-container">
				<view class="head-image"></view>
				<view class="right-bar">
					<view class="name">小明</view>
					<view class="city">
						<image src="http://printer.noerror.xyz/appImage/head-icon.png" class="head-icon"></image>
						<text>广州</text>
					</view>
				</view>
			</view>
		</view>
    </view>
</template>

<script>
    import {letter} from "@/utils/apiManager/letterApi";
 //    import {py} from '@/utils/pingyin/pinyin';
 //    import {isNotNullTrim, checkNumber, moveArray} from "@/utils/utils";
    import {loginModules} from "@/utils/apiManager/loginApi";
 //    import user from "@/store/modules/user";
 //    const PinyinMatch = require('pinyin-match');

    export default {
        name: 'writeLetter',

        data() {
            return {
                boomFriend: []
            }
        },

        mounted() {
			// let data = {
			// 	username: "huange7",
			// 	password: '123456'
			// }
			// loginModules.login(data).then()
            letter.getBoomFriend().then(res => {
                if (res.code == 1) {
                    this.boomFriend = this.reFormat(res.data.records)
					console.log(this.boomFriend)
                }
            })

        },

        methods: {
            reFormat(data){
                const newData = []
                for (let i = 0, len = data.length; i < len ;i++) {
                    //判断第一个字符是不是数字,或者是空
                    let firstStr
                    if (data[i].nickname === null) {
                        firstStr = ['#']
                    } else {
                        firstStr = checkNumber(data[i].nickname.charAt(0)) ?
                            ['#'] : py(data[i].nickname.charAt(0))
                    }
                    //查看一下有没有这个分组，但是注意一下下表是0的情况
                    const has = this.hasGroup(firstStr[0], newData)
                    //the array has not this str group
                    if (has === 'none') {
                        newData.push({
                            group: firstStr[0],
                            data: []
                        })
                        newData[newData.length-1].data.push(data[i])
                    } else {
                        newData[has].data.push(data[i])
                    }
                }
                newData.sort((a, b) => {
                    return (a.group + '').localeCompare(b.group + '')
                })
                moveArray(newData, [0], newData.length-1, 1)
                return newData
            },

            hasGroup(str, arr) {
                for (let i = 0, len = arr.length; i < len; i++) {
                    if (arr[i].group === str) {
                        return i
                    }
                }
                return 'none'
            },

            jump(userId) {
                this.$router.push({
                    name: 'friendInfo',
                    query: {
                        userId: userId
                    }
                })
            }
        }
    }
</script>
