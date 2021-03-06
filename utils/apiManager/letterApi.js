import {Request} from "@/utils/apiManager/request";
import {getResult} from "@/utils/apiManager/response";

class LetterApi extends Request{
    //获取炮友列表
    async getBoomFriend() {
        return getResult(await this.get('/friend'))
    }
    //根据某一个userId查询用户信息
    async getSingleInfo(data) {
        return getResult(await this.get('/user/' + data))
    }
    //获取笔友之间的信件
    async getFriendLetter(data) {
        return getResult(await this.get('/letter/?friendId=' + data))
    }
    //用户新增加树洞
    async addTree(data) {
        return getResult(await this.post('/tree-hole', data))
    }
    //获取树洞列表
    async getHoleList() {
        return getResult(await this.get('/tree-hole'))
    }
    //写信
    async submitLetter(data) {
        return getResult(await this.post('/letter', data))
    }
    //时间胶囊
	async submitDate(data) {
		return getResult(await this.post('/letter/capsule', data))
	}
	//获取用户的邮票
    async getUserStamp() {
        return getResult(await this.get('/stamp/?page=1&pageSize=10'))
    }
    //删除笔友
    async deleteFriend(data) {
        return getResult(await this.delete('/friend/'+ data))
    }
    //把信件设置为已读
    async hasRead() {
        return getResult(await this.delete('/friend/'+ data))
    }
    //查询单个信件内容
    async getSingleLetter(data) {
        return getResult(await this.get('/letter/' + data))
    }
    //提交留言
    async submitLeaving(data) {
        return getResult(await this.post('/message/', data))
    }
}

export const letter = new LetterApi()