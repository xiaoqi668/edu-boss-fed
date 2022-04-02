import request from '@/utils/request'
import qs from 'qs'
//引入Vuex的数据
import store from '@/store'
//用户登陆接口
export const login = data => {
    return request({
        method: 'POST',
        // headers: { 'content-type': 'application/x-www/form-urlencoded' },
        url: '/front/user/login',
        //urlencoded 格式： 名=值&名=值
        //使用qs对数据格式转换
        data: qs.stringify(data)
    })
}

//用户基本信息接口
export const getUserInfo = () => {
    return request ({
        method: 'GET',
        url: '/front/user/getInfo',
        headers: {
            Authorization :store.state.user.access_token
        }
    })
}