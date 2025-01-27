import axios from "axios";

export const Axios = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})

export const fetcher = (url, params) => Axios.get(url, params).then(res => res.data) 