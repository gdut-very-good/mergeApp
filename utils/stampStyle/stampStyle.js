//图片样式,前端保存
export const stamp = [
    {
        stampId: [],
        stampName: '热气球',
        url: 'http://printer.noerror.xyz/appImage/热气球.png'
    },
    {
        stampId: [],
        stampName: '钥匙',
        url: 'http://printer.noerror.xyz/appImage/钥匙.png'
    },
    {
        stampId: [],
        stampName: '女士',
        url: 'http://printer.noerror.xyz/appImage/女士.png'
    },
    {
        stampId: [],
        stampName: '玫瑰',
        url: 'http://printer.noerror.xyz/appImage/玫瑰.png'
    },
    {
        stampId: [],
        stampName: '男孩',
        url: 'http://printer.noerror.xyz/appImage/男孩.png'
    },
    {
        stampId: [],
        stampName: '女孩',
        url: 'http://printer.noerror.xyz/appImage/女孩.png'
    },
    {
        stampId: [],
        stampName: '巴黎',
        url: 'http://printer.noerror.xyz/appImage/巴黎.png'
    },
    {
        stampId: [],
        stampName: '笔墨',
        url: 'http://printer.noerror.xyz/appImage/笔墨.png'
    },
    {
        stampId: [],
        stampName: '绅士',
        url: 'http://printer.noerror.xyz/appImage/绅士.png'
    },
    {
        stampId: [],
        stampName: '中国',
        url: 'http://printer.noerror.xyz/appImage/绅士.png'
    },
]

function clearAllId() {
    for (let i = 0; i < stamp.length; i++) {
        stamp[i].stampId = []
    }
}

export function initStampId(user) {
    clearAllId()
    for (let i = 0 ; i < user.length; i++) {
        for (let j = 0; j < stamp.length; j++) {
            if (user[i].stampName === stamp[j].stampName) {
                stamp[j].stampId.push(user[i].stampId)
            }
        }
    }
}

/**
 * 获取用户已经有的邮票
 * @param user
 * @returns {[]}
 */
export function getUserStamp(user) {
    const exist = []
    const stampList = []
    for (let i = 0; i < user.length; i++) {
        if (exist.indexOf(user[i].stampName) !== -1) {
            continue
        }
        for (let j = 0; j < stamp.length; j++) {
            if (user[i].stampName === stamp[j].stampName) {
                exist.push(stamp[j].stampName)
                stampList.push(stamp[j])
            }
        }
    }
    return stampList
}

/**
 * 根据单个id匹配url
 * @param stampName
 * @returns {{stampId, url}|*}
 */
export function matchId(stampName) {
    for (let i = 0, len = stamp.length; i < len; i++) {
        if (stamp[i].stampName == stampName) {
            return stamp[i]
        }
    }
}

/**
 * 根据stampId匹配返回邮票列表
 * @param stampArr,传入stampId数组
 * @returns {[]}
 */
export function matchStamp(stampArr) {
    const stamp = []
    stampArr.forEach(item => {
        stamp.push(matchId(item))
    })
    return stamp
}