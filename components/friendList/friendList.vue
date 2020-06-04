<style scoped lang="scss">
	.friend-container {
		min-height: 100%;
		overflow: scroll;
		width: 100%;
	}
	
	.pingyin-container {
		height: 1rem;
		background-color: #ededed;
		line-height: 1rem;
		font-size: 0.9rem;
	}
	
	.friend-list-container {
		pointer-events: auto;
		padding: 0.5rem 0 0.5rem 0;
		height: 2.5rem;
	}
	
	.inner-container {
		display: flex;
		flex-direction: row;
		height: 100%;
		padding-left: 1rem;
	}
	
	.head-image {
		border: 1px solid black;
		height: 2.5rem;
		width: 2.5rem;
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
		font-size: 0.8rem;
	}
	
	.city {
		display: flex;
		align-items: center;
		height: 50%;
		font-size: 0.7rem;
	}
	
	.head-icon {
		height: 1rem;
		width: 1rem;
	}
    
</style>

<template>
    <view class="friend-container">
		<view  v-for="item in boomFriend">
			<view class="pingyin-container">
				<view class="inner-container">
					{{item.group}}
				</view>
			</view>
			<view class="friend-list-container" v-for="friend in item.data" @click="jump(friend)">
				<view class="inner-container">
					<image class="head-image" :src="'http://island.hellochaos.cn/uploads/'+friend.photo"></image>
					<view class="right-bar">
						<view class="name">{{friend.nickname}}</view>
						<view class="city">
							<image src="http://printer.noerror.xyz/appImage/postion.png" class="head-icon"></image>
							<text>{{friend.city}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
    </view>
</template>

<script>
    import {letter} from "@/utils/apiManager/letterApi";
    import {py} from '@/utils/pingyin/pinyin';
    import {isNotNullTrim, checkNumber, moveArray} from "@/utils/utils";
    import {loginModules} from "@/utils/apiManager/loginApi";
 //    import user from "@/store/modules/user";
    // const PinyinMatch = require('pinyin-match');

    export default {
        name: 'writeLetter',

        data() {
            return {
            	test: 'postion.png',
                boomFriend: []
            }
        },

		onShow() {
        	console.log('nhao')
		},

		onLoad() {
			console.log('执行onload')
		},


		mounted() {
			console.log('重新请求数据')
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

            jump(info) {
                uni.navigateTo({
                	url: '/pages/index/letter/writerLetter/letterMessage/letterMessage?userId=' + info.userId + '&nickname=' + info.nickname  ,
					fail(res) {
						console.log(res)
					}
                })
            }
        }
    }
</script>
