import axios from "axios";

export const Axios = axios.create({
    baseURL: "https://localhost:7035"
})

export const fetcher = (url, params) => Axios.get(url, params).then(res => res.data) 