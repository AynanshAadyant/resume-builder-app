import axios from 'axios';

class API {
    axiosInstance: any;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: import.meta.env.VITE_BACKEND_URL_LOCAL, //import.meta.env.VITE_STATUS === "PROD" ? "/api" : import.meta.env.VITE_BACKEND_URL,
            withCredentials: true,
        });
    }

    async post(url: string, data?: any) {
        try {
            const response = await this.axiosInstance.post(url, data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async get(url: string) {
        try {
            const response = await this.axiosInstance.get(url);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async put(url: string, data: any) {
        try {
            const response = await this.axiosInstance.put(url, data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async delete(url: string) {
        try {
            const response = await this.axiosInstance.delete(url);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default new API();