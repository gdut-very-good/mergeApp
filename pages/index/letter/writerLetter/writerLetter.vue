<template>
	 <view class="writeLetter-container">
	        <!-- <view class="box-add">
	            <view class="add-circle" @click="openBtn">+</view>
	        </view>
	        <view class="box" v-if="show">
	            <view class="other-item-shudong" @click="route('shudong')">树洞</view>
	        </view>
	        <view class="box-jiaonang" v-if="show">
	            <view class="other-item-jiaonang" @click="route('jiaonang')">胶囊</view>
	        </view>
	        <view class="box-xiexin" v-if="show">
	            <view class="other-item-xiexin" @click="route('writeLetter')">写信</view>
	        </view> -->
	        <view class="bottom-con">
	           <letterNav @changeModule="changeModule"></letterNav>
	           <friendList></friendList>
	           <!-- <shudongList :style="!show?'display:block':'display:none'"></shudongList> -->
	        </view>
	    </view>
</template>

<script>
	import friendList from '../../../../components/friendList/friendList'
	export default {
		data() {
			return {
				show: true
			}
		},
		methods: {

		}
	}
</script>

<style>
	import letterNav form "../../../../letterNav/letterNav"
	
	    .writeLetter-container {
	        padding-bottom: 1.6rem;
	    }
	
	    .bottom-con {
	        height: calc(100% - 1.5rem);
	        width: 100%;
	    }
	
	    .add-circle {
	        right: 1rem;
	        z-index: 100;
	        @radius: 1.3rem;
	        height: @radius;
	        width: @radius;
	        font-size: 1.5rem;
	        text-align: center;
	        line-height: @radius;
	        background-color: rgb(203,176,68);
	        border-radius: 50%;
	        @radius: 1.4rem;
	        position: absolute;
	        bottom: 1.8rem;
	        color: white;
	    }
	
	    .box {
	       /* .publicBox; */
	        animation:circleRoate 1s ;
	        animation-timing-function:linear;
	        animation-fill-mode: forwards;
	    }
	
	    .box-jiaonang {
	     /*   .publicBox; */
	        animation:circleRoate_jiaonang 1s ;
	        animation-timing-function:linear;
	        animation-fill-mode: forwards;
	    }
	
	    .box-add {
	       /* .publicBox; */
	    }
	
	    .box-xiexin {
	     /*   .publicBox; */
	    }
	
	    @keyframes circleRoate_jiaonang{
	        from{transform: rotate(0deg);}
	        to{transform: rotate(90deg);}
	    }
	
	
	    @keyframes circleRoate{
	        from{transform: rotate(0deg);}
	        to{transform: rotate(180deg);}
	    }
	
	    .other-item-shudong {
	        /* .letter-button; */
	        transform: rotate(180deg);
	    }
	
	    .other-item-jiaonang {
	  /*      .letter-button; */
	        transform: rotate(-90deg);
	    }
	
	    .other-item-xiexin {
	       /* .letter-button; */
	    }
</style>
