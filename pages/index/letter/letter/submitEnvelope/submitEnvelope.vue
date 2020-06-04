<style scoped lang="less">
    .bottom-con {
		padding-top: 5rem;
        .envelope-con {
            position: relative;
            height: 10rem;
            width: 95%;
            border: 1px solid black;
			margin: auto;
			background-image: url(../../../../../static/letter/envelope.png);
			background-repeat: no-repeat;
			background-size: 100%;
			background-position: center;

            .contact-con {
                height: 1rem;
                width: 24%;
                margin: 1rem 0 0 0.2rem;
            }

            .wenzi {
                display: block;
                height: 100%;
                line-height: 0.8rem;
                text-align: center;
                font-size: 0.8rem;
            }

            .stamp {
                position: absolute;
                right: 1.5rem;
                top: 0.5rem;
                height: 5rem;
                width: 3.8rem;
                font-size: 0.8rem;
            }
        }

        .submit-btn {
            height: 2rem;
            width: 50%;
            line-height: 2rem;
            margin: 0.5rem auto auto;
            text-align: center;
            font-size: 0.8rem;
            background-color: #238FFF;
            border-radius: 6px;
            color: white;
        }
    }

</style>

<template>
    <view class="letter-container">
        <contact :contactList="contactList" :layerShow="isShow" @close="close"></contact>
        <letterPop :letterShow="stampShow" @closeStamp="closeStamp"></letterPop>
        <view class="bottom-con">
            <view class="envelope-con">
                <image class="stamp" @click="showStamp" :src="stampUrl"></image>
                <view class="contact-con">
                    <text class="wenzi" @click="showList">{{friendName}}</text>
                </view>
            </view>
            <view class="submit-btn" @click="submit">投递</view>
            <view class="submit-btn" @click="saveDraft">存草稿</view>
        </view>
    </view>
</template>

<script>
    import {letter} from "@/utils/apiManager/letterApi";
    import {getUserStamp, initStampId} from "@/utils/stampStyle/stampStyle";
    import {formatDate} from "@/utils/date/date";
    import letterPop from "@/components/letterPop/letterPop";
    import {loginModules} from "@/utils/apiManager/loginApi";
    import contact from "@/components/contact/contact";
	import {letterInformation} from "@/utils/userInfo/letterInfo"
	import {errorCode} from "@/utils/errorCode/errorCode"
	import Api from "../../../../../utils/apiManager/Api";

    export default {
        name: 'letter',

        components: {
            contact,
            letterPop
        },

        data() {
            return {
                contactList: null,
                isShow: false,
                stampShow: false,
                stampUrl: '',
				stampId: '',
                friendName: null
            }
        },

        mounted() {
            this.getContactList()
            this.initData()
        },

        methods: {
            initData() {
                letter.getUserStamp().then(res => {
                    if (res.code == 1) {
                        initStampId(res.data.records)
                        const temp =  getUserStamp(res.data.records)
                        this.stampUrl = temp[0].url
                        this.stampId = temp[0].stampId[0]
                    } else {
                        errorCode(res)
                    }
                })
            },

            getContactList() {
                letter.getBoomFriend().then(res => {
                    this.contactList = res.data.records
                    this.friendName = res.data.records[0].nickname
					letterInformation.info.receiverId = res.data.records[0].userId
					letterInformation.info.stampId = res.data.records[0].stampId
                })
            },

            showList() {
                this.isShow = true
            },

            close(data) {
                this.isShow = false
                if (data.name) {
                    this.friendName = data.name
                }
            },

            closeStamp(data) {
                this.stampShow = false
                if (data.url) {
					this.stampId = data.stampId
                    this.stampUrl = data.url
                }
            },

            showStamp() {
                this.stampShow = true
            },

            submit() {
				letterInformation.info.sendTime = formatDate();
				letterInformation.info.stampId = this.stampId;
                const reqData = letterInformation.info;
                letter.submitLetter(reqData).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: '发送成功'
						});
                        setTimeout(() => {
                            uni.navigateBack({
                                delta: 3
                            })
                        }, 500)
					} else {
						errorCode(res)
					}
                })
            },
			saveDraft() {
				letterInformation.info.sendTime = formatDate();
				letterInformation.info.stampId = this.stampId;
				const reqData = letterInformation.info;
				Api.post("/letter/", {
					...reqData,
					send : false,
                    isSend : false,
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: '保存成功'
						});
						setTimeout(() => {
							uni.navigateBack({
								delta: 3
							})
						}, 500)
					} else {
						errorCode(res)
					}
				});
            }
        },
    }
</script>


