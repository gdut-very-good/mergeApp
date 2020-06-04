<template>
	<view>
		<view class="islands" v-if="islands.length">
			<island-item v-for="(data, index) in islands" v-bind="data"/>
		</view>
		<view v-else class="error">
			没有找到数据哦
		</view>
	</view>
</template>

<script>
	import IslandItem from "../../../../components/islandItem/IslandItem";
	import Api from "../../../../utils/apiManager/Api";
	export default {
		components: {IslandItem},
		data() {
			return {
				islands : [],
				factor : '',
				dataStr : ""
			};
		},
		async onLoad(options) {
			this.factor = options.wd;
			let {data} = await Api.get(`/user/?page=${1}&pageSize=${100}&factor=${this.factor}`);
			this.islands = data.records;
			this.dataStr = JSON.stringify(data);
		}
	}
</script>

<style lang="less">
	.error {
		font-size: 16px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 10px;
	}
	.islands {
		margin-top: 5px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
</style>
