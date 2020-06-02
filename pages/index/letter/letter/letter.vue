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
		justify-content: center;
		position: fixed;
		right: 1.5rem;
		bottom: 6rem;
		height: 2.5rem;
		width: 2.5rem;
		border-radius: 50%;
		background-color: rgb(203,176,68);
		overflow: hidden;
		
		image {
			height: 2rem;
			width: 2rem;
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
<!--		<view class="envelope-image" style="bottom: 10rem;" @click="submit">-->
<!--			<image			        -->
<!--				src="http://printer.noerror.xyz/appImage/gou.png"-->
<!--			>-->
<!--			</image>-->
<!--		</view>-->
		<view class="envelope-image"  @click="jump('envelope')">
			<image src="http://printer.noerror.xyz/appImage/envelope1.png"></image>
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

    export default {
        name: 'letter',
        data() {
            return {
                title: '',
                content: ''
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

        onShow() {


        },

        methods: {
            jump(module) {
				console.log('nihao1')
				uni.navigateTo({
					url: './envelope/envelope'
				})
            }
        }


    }
</script>


