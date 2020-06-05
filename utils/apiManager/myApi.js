import {Request} from "@/utils/apiManager/request";
import {getResult} from "@/utils/apiManager/response";

class my extends Request{
    //获取用户的邮票
    async getStamp() {
        return getResult(await this.get('/stamp/?page=1&pageSize=10'))
    }
    //获取未读取的邮件
    async getNotice() {
        return getResult(await this.get('/notice/'))
    }
    //删除树洞
    async deleteTree(data) {
        return getResult(await this.delete('/tree-hole/' + data))
    }
    //获取单个树洞的信息
    async getSingleTreeHole(data) {
        return getResult(await this.get('/tree-hole/'+data))
    }
    //获取自己的树洞列表
    async getMyTreeHole() {
        return getResult(await this.get('/tree-hole/me'))
    }
    //头像上传
    async uploadHeadIcon(data) {
        return getResult(await this.upload('/user/upload', data))
    }
    //查询用户信息
    async getUserInfo(userId) {
        return getResult(await this.get('/user/' + userId))
    }
    //设置消息已读
    async setMessageRead(messageId) {
        return getResult(await this.put('/notice/read/' + messageId))
    }
    //获取信件信息
    async getSingleMessage(messageId) {
        return getResult(await this.get('/notice/' + messageId))
    }
    //根据auth获取获取个人信息
    async getAuthUserInfo(data) {
        return getResult(await this.get('/user/me', data))
    }
}
export const myApi = new my()