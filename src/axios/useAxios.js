import axios from '@/axios/axios.js'

//使用
export function getInfo(params) {
  return axios({
    url: '/user/info',
    method: 'get',
    params
  });
}