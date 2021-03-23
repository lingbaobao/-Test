import axios from 'axios';
import qs from "qs"
import Cookie from 'vue-cookies'

// 创建axios实例
var instance = axios.create({ timeout: 1000000 });
var cookieName="saasToken";


// 添加请求拦截器
instance.interceptors.request.use(function (config) {
	config.withCredentials = true;
    // 没有获取到$cookies,跳转到登录
    if( Cookie.get(cookieName) == null){
        window.location.href="http://sso.wupao.com/auth/login";
    }else{
		console.info("cookieName:"+Cookie.get(cookieName) );
        //config.headers.Authorization = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTQwNjcyODQsInVzZXJuYW1lIjoiMTc3NDQ0NDQ0NDQifQ.Y68A5sXQAUu4ohsBqYza65kfRz-NiEHOJlzSSLo2490";
        return config;
    }
    // config.headers.Authorization = window.localStorage.getItem('JWT_TOKEN');
    //config.headers.Authorization = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTQwNjcyODQsInVzZXJuYW1lIjoiMTc3NDQ0NDQ0NDQifQ.Y68A5sXQAUu4ohsBqYza65kfRz-NiEHOJlzSSLo2490";
    // if (config.method === 'post') {
    //     config.data = qs.stringify(config.data)
    // }
},error => {
    console.log(error)
    return error
})

// 添加响应拦截器
instance.interceptors.response.use(res => {
    if (res.data.code == 34000) {
        window.localStorage.clear();
        window.location.href = res.data.msg;
    }else {
        return res;
    }
},err => {
    console.log(err)
    return err
})


export default instance;
