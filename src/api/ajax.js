import axios from 'axios'
import { message } from 'antd'

export default function ajax(url, data = {}, Method = "GET",) {

    return new Promise((resolve, reject) => {
        let promise
        if (Method === "GET") {
            promise = axios.get(url, { params: data })
        } else if (Method === "POST") {
            promise = axios.post(url, data)
        }
        promise.then(resp => {
            resolve(resp.data)
        }).catch(err => {
            message.error(err.message)
        })
    })
}