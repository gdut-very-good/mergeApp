class user {
	constructor() {
		this.Info = {
			capsule: 3,
			city: "广州市",
			mail: "123456@qq.com",
			nickname: "哈",
			receiveLetter: 6,
			sendLetter: 7,
			signature: "吃屎吧",
			userId: 6,
			username: "huange7",
			word: 255
		}
	}

	initInfo(userInfo) {
		this.Info = userInfo
	}
}

export const userInfo = new user();
