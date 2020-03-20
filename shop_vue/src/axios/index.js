import axios from 'axios'
import router from '../router/index'
import store from '../store/store'
import * as type from '../store/mutations-type'
axios.defaults.baseURL = "http://116.62.50.105:3300"
// axios.defaults.baseURL = "http://localhost:3300"
axios.interceptors.request.use(config=>{
    let pathname = location.pathname;
    if(localStorage.getItem('token') && (pathname!="login" || pathname!="register")){
        config.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    }
    return config;
})
axios.interceptors.response.use(response=>{
    return response
},error=>{
    if(error.response){
        switch(error.response.status){
            case 401:
                store.commit(type.MUTATIONS_CLEARUSERINFO);  //清除所有数据
                router.push('/login');
        }   
    }
}
)
export default axios;