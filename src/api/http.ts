import axios, { AxiosRequestConfig } from "axios";
import { Toast } from "vant";
// 对请求进行计数，防止多重loading
let reqNum = 0;
const startLoading = () => {
  if (reqNum === 0) {
    Toast.loading({
      message: "加载中...",
      duration: 0,
      forbidClick: true
    });
  }
  reqNum += 1;
};

const closeLoading = () => {
  if (reqNum <= 0) return;
  reqNum -= 1;
  if (reqNum === 0) {
    // 合并 300s 内的loading
    setTimeout(Toast.clear, 300);
  }
};
// 扩展 AxiosRequestConfig ,添加 是否需要loading参数
interface IConfig extends AxiosRequestConfig {
  needLoading: boolean;
}
// 请求超时时间
axios.defaults.timeout = 12000;

// 根据url是否有 test ，请求不同的地址
axios.defaults.baseURL = /test/gi.test(window.location.host)
  ? process.env.VUE_APP_TEST_BASE_API
  : process.env.VUE_APP_BASE_API;

// post请求头的设置
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.Authorization = ""; // 授权头设置
// axios 请求拦截器
axios.interceptors.request.use(
  axiosConfig => {
    //  ts 断言
    let config = axiosConfig as IConfig;
    if (config.needLoading) {
      startLoading();
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// axios response拦截器
axios.interceptors.response.use(
  response => {
    let config = response.config as IConfig;
    if (config.needLoading) {
      closeLoading();
    }
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误 结合自身业务和后台返回的接口状态约定写response拦截器
    if (response.status === 200) {
      return Promise.resolve(response);
    }
    return Promise.reject(response);
  },
  error => {
    if (error.config.needLoading) {
      closeLoading();
    }
    return Promise.reject(error);
  }
);
/**
 * 封装get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function get<T>(
  url: string,
  params = {},
  needLoading = true
): Promise<[Error | undefined, T | undefined]> {
  return new Promise((resolve, reject) => {
    axios
      .get<T>(url, {
        params,
        needLoading
      } as IConfig)
      .then(res => {
        resolve([void 0, res.data]);
      })
      .catch(err => {
        resolve([err, undefined]);
      });
  });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param needLoading
 */
function post<T>(
  url: string,
  params: object,
  needLoading = true
): Promise<[Error | undefined, T | undefined]> {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, { needLoading } as IConfig)
      .then(res => {
        resolve([void 0, res.data]);
      })
      .catch(err => {
        resolve([err, undefined]);
      });
  });
}

export { get, post };
