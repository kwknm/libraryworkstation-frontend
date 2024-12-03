import axios from "axios";

export const Axios = axios.create({
    baseURL: "http://localhost:5000"
})

export const fetcher = (url, params) => Axios.get(url, params).then(res => res.data) 