import axios, { AxiosError } from "axios";
import {
    ICoordinateResponse,
    ICompleteWeatherData,
    IWeatherParameters,
} from "./openWeatherTypes";

const apiClient = axios.create({
    baseURL: "http://api.openweathermap.org/",
});

apiClient.interceptors.request.use((config) => {
    config.params = {
        appid: process.env.OPEN_WEATHER_KEY,
        ...config.params,
    };
    return config;
});

export const getCoordinatesForCity = async (city: string) => {
    try {
        const response = await apiClient.get<ICoordinateResponse[]>(
            `/geo/1.0/direct`,
            {
                params: {
                    q: city,
                },
            }
        );

        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.log(err.message);
        return null;
    }
};

export const getWeatherForDay = async (parameters: IWeatherParameters) => {
    try {
        const response = await apiClient.get<ICompleteWeatherData>(
            `/data/2.5/onecall/timemachine`,
            {
                params: {
                    ...parameters,
                    units: "metric",
                },
            }
        );

        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error(err.message);
        return null;
    }
};
