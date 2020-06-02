<style scoped lang="less">
    input {
      outline: none;
    }

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
		bottom: 4rem;
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

</style>

<template>
    <div>
		<view class="submit-btn">
			<image class="save-image" src="http://printer.noerror.xyz/appImage/gou.png" @click="submit"></image>
		</view>
        <div class="bottom-con">
            <input class="shudong-second-title"
                   type="text"
                   placeholder="树洞标题"
                   v-model="title"
            >
            <div class="text-area">
                <textarea
                        placeholder="写下你想对树洞大人说的吧..."
                        id=""
                        cols="30"
                        rows="10"
                        v-model="content"
                >
                </textarea>
            </div>
        </div>
    </div>
</template>

<script>
    import {letter} from "@/utils/apiManager/letterApi";
    import {errorCode} from "@/utils/errorCode/errorCode";

    export default {
        name: 'shudong',

        data() {
            return {
                title: '',
                content: ''
            }
        },

        methods: {
            submit() {
                const data = {
                    "content": this.content,
                    "title": this.title
                }
                letter.addTree(data).then(res => {
                    console.log(res)
                    if (res.code == 1) {
						uni.showToast({
						    title:"提交成功" 
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
                    } else {
                        errorCode(res)
                    }
                })
            }
        }

    }
</script>


