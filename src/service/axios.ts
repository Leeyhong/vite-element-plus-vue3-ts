import axios from 'axios';
import { showMessage } from "./status";   // 引入状态码文件
import { ElMessage } from 'element-plus'  // 引入el 提示框，这个项目里用什么组件库这里引什么
import { useRouter } from "vue-router";
let router = useRouter();

// 请求地址
axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL

// 设置接口超时时间
axios.defaults.timeout = 60000;

// 需要传递的自定义请求头
axios.defaults.headers['Content-Type'] = 'application/json'

//http request 拦截器
axios.interceptors.request.use(
  (config: any) => {
    // localStorage是否含有token，如果有，则赋值请求头的token为localStorage中存储的token
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization')
    }
    return config;
  },
  (error:any) => {
    return Promise.reject(error);
  }
);

//http response 拦截器
axios.interceptors.response.use(
  (response:any) => {
    if (response.data.code === 401) {
      localStorage.removeItem('Authorization')
      ElMessage.error('登录状态失效');
      router.replace({path: '/login'})
    }
    return response.data;
  },
  (error:any) => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      showMessage(response.status);           // 传入响应码，匹配响应码对应信息
      return Promise.reject(response.data);
    } else {
      ElMessage.warning('网络连接异常,请稍后再试!');
    }
  }
);

// 封装 GET POST 请求并导出
export function request(url = '', params = {}, type = 'POST') {
  //设置 url params type 的默认值
  return new Promise((resolve, reject) => {
    let promise
    if (type.toUpperCase() === 'GET') {
      promise = axios({
        url,
        params
      })
    } else if (type.toUpperCase() === 'POST') {
      promise = axios({
        method: 'POST',
        url,
        data: params
      })
    }
    //处理返回
    promise?.then((res:any) => {
      resolve(res)
    }).catch((err:any) => {
      reject(err)
    })
  })
}
export default axios