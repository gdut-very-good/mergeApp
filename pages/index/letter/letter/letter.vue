<style scoped lang="less">
    .bottom-con {
        position: relative;
        width: 85%;
        margin: auto;

        .show-envelope-btn {
            position: absolute;
            height: 2rem;
            width: 30%;
            left: 35%;
            opacity: 0.7;
            top: 0.2rem;
        }
    }

	.envelope-image {
		display: flex;
		align-items: center;
        flex-direction: column;
		justify-content: center;
		position: fixed;
		right: 1.5rem;
		bottom: 6rem;
		height: 5rem;
		width: 2.5rem;
		border-radius: 50%;
		overflow: hidden;

		image {
			height: 2rem;
			width: 2rem;
		}

        .img1 {
            background-color: #ffc300;
            border-radius: 50%;
            margin-bottom: 0.5rem;
        }


	}

    .letter-title {
        @letter_height: 2.5rem;
        line-height: @letter_height;
        height: @letter_height;
        font-size: 1rem;
        border-bottom: 1px solid black;
    }

    .letter-content {
		padding-top: 1rem;
        height: 10rem;
    }

    .choose-envelope-con {

    }

</style>

<template>
    <div class="letter-container">
		<view class="envelope-image">
			<image class="img1" @click="jump('envelope')" src="http://printer.noerror.xyz/appImage/envelope1.png"></image>
            <image class="img2" v-show="draftId" @click="deleteDraft" src="https://s1.ax1x.com/2020/06/04/t0jWPH.png"></image>
		</view>
        <div class="bottom-con">
            <input class="letter-title" placeholder="信件标题" style="outline: none" v-model="title">
            <textarea name="" id="" cols="30" rows="10" class="letter-content" placeholder="写点东西" v-model="content"></textarea>
        </div>
    </div>
</template>

<script>
    import {loginModules} from "@/utils/apiManager/loginApi";
	import {letterInformation} from "@/utils/userInfo/letterInfo"
    import {letter} from "../../../../utils/apiManager/letterApi";
    import {errorCode} from "../../../../utils/errorCode/errorCode";
	import Api from "../../../../utils/apiManager/Api";

    export default {
        name: 'letter',
        data() {
            return {
                title: '',
                content: '',
                draftId: '',
				draftData : {},
                unStore : false
            }
        },

        watch: {
            'title': function(value) {
				letterInformation.info.header = value
            },
            'content': function (value) {
				letterInformation.info.content = value
            }
        },

        onLoad(option) {
            if (option.letterId) {
                this.draftId = option.letterId;
                this.getDraftContent()
            }
        },

		onBackPress(event, rua) {
        	console.log(event, rua);
        	let vm = this;
			if(this.draftId) {
				Api.put("/letter", {
					...this.draftData,
					letterId : this.draftId,
					content : this.content,
					header : this.title
				});
				return false;
			} else {
				uni.showModal({
					title: '提示',
					content: '要保存这个信件为草稿吗',
					success: function (res) {
						if (res.confirm) {
							vm.jump();
						} else {
							vm.unStore = true;
							uni.navigateBack({
                                delta : 1
                            })
                        }
					}
				});
				return !this.unStore;
			}

        },

        methods: {
            jump(module) {
				uni.navigateTo({
					url: `./submitEnvelope/submitEnvelope?letterId=${this.draftId}`
				})
            },
			deleteDraft() {
				let vm = this;
				uni.showModal({
					title: '提示',
					content: '确认要删除吗',
					success: function (res) {
						if (res.confirm) {
							Api.delete(`/letter/${vm.draftId}`).then(async (res) => {
								uni.switchTab ({
									url : '/pages/index/draft/draft',
								})
							});
						}
					}
				});
            },
            getDraftContent() {
                letter.getSingleLetter(this.draftId).then(res => {
                    console.log(res);
                    if (res.code == 1) {
                        this.content = res.data.letter.content;
                        this.title = res.data.letter.header;
                        this.draftData = res.data.letter;
                    } else {
                        errorCode(res)
                    }
                })
            }
        }


    }
</script>


