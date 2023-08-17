import axios from "axios";

import { getCookie, delCookie } from "./cookies";

const baseURL = import.meta.env.VUE_APP_API_URL ?? "https://be.tautan.tk"; //kurang tau kenapa tidak bisa membaca .env

const baseApi = axios.create({
    baseURL
})


baseApi.interceptors.request.use((config) => {
    const token = getCookie('CERT')
    if (token) config.headers.Authorization = `Bearer ${token}`
    else {
        delCookie('CERT')
        delete config.headers.Authorization
    }
    return config
},
    (error) => {
        throw error
    }
)

baseApi.interceptors.response.use(
    (response) => response.data,
    (error) => {
      switch (error.response.status) {
        case 401:
          delCookie('CERT')
          break
        default:
          break
      }
      throw error?.response?.data ?? error
    }
  )
  
  export { baseApi }