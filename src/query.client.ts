import axios, { AxiosRequestConfig, AxiosResponse } from "axios";


// const baseURL = process.env.REACT_APP_API_URL;
const axiosClient = axios.create({
    baseURL: "http://13.236.68.107:8083",
    headers: {
        "Content-Type": "application/json"
        // Authorization: `Bearer ${Storage.getLocal("token")}`,
    },
});

//Add request interceptor
// axiosClient.interceptors.request.use(
// //     function (config: AxiosRequestConfig): any {
// //         return config;
// //     },
// //
// //     function (error) {
// //         return Promise.reject(error);
// //     }
// // );
// //
// // //Add a response interceptor
// // axiosClient.interceptors.response.use(
// //     function (response: AxiosResponse) {
// //         return response.data;
// //     },
// //
// //     function (error) {
// //         return Promise.reject(error);
// //     }
// // );

export default axiosClient;