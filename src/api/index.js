import request from '../utils/request';
import Vue from 'vue'
import Axios from 'axios'

const axiosInstance = Axios.create({
    withCredentials: true
})

// 通过拦截器处理csrf问题，这里的正则和匹配下标可能需要根据实际情况小改动
axiosInstance.interceptors.request.use((config) => {
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    const regex = /.*csrftoken=([^;.]*).*$/
    config.headers['X-CSRFToken'] = document.cookie.match(regex) === null ? null : document.cookie.match(regex)[1]
    return config
})

axiosInstance.interceptors.response.use(
    response => {
        return response
    },
    error => {
        return Promise.reject(error)
    }
)

Vue.prototype.axios = axiosInstance

export default axiosInstance
export const getTestResult = query => {
    return request({
        url: 'http://192.168.120.27:8077/get_test_result',
        method: 'post',
        data: query
    });
};
export const getIndustryList = query => {
    return request({
        url: 'http://192.168.120.27:8077/get_industry',
        method: 'post',
        data: query
    });
};
export const getIndustryDataList = query => {
    return request({
        url: 'http://192.168.120.27:8077/get_industry_data',
        method: 'post',
        data: query
    });
};
export const addTest = query => {
    return request({
        url: 'http://192.168.120.27:8077/add_test',
        method: 'post',
        data: query,
        timeout: 99999999999
    });
};
export const deleteTestResult = query => {
    return request({
        url: 'http://192.168.120.27:8077/delete_test_result',
        method: 'post',
        data: query
    });
};
export const downloadResult = query => {
    return request({
        url: 'http://192.168.120.27:8077/download_file',
        method: 'post',
        data: query,
        responseType: 'blob'
    });
};