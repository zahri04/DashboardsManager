import axios from "axios";

const AxiosInstance=axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
});

export default AxiosInstance;

export const TokenInterceptor=()=>{
    AxiosInstance.interceptors.request.use((config)=>{
        const token=localStorage.getItem("token");
        if(token){
            config.headers["Authorization"]=`Bearer ${token}`;
        }
        return config;
    },(error)=>{
        return Promise.reject(error);
    });
}
