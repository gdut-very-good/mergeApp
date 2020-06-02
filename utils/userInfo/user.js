class user {
	constructor() {
		this.Info = {
			background: "9b9d2769-e1cb-4ebd-8f25-fed1928294ae.jpg",
			capsule: 3,
			city: "广州市",
			mail: "123456@qq.com",
			nickname: "哈",
			password: "",
			photo: "73e0582d-91f8-4d76-bf4e-faea59abfc23.png",
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

export const userInfo = new user()