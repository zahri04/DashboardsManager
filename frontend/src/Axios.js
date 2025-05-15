import axios from "axios";

const AxiosInstance=axios.create({
    baseURL: "http://backend:8080/api",
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
