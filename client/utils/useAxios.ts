import axios, { AxiosInstance } from 'axios'


const useAxios = (): AxiosInstance =>{
    const axiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
        withCredentials: true
    })
    


    return axiosInstance
}

export default useAxios
