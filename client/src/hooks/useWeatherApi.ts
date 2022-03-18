import axios from "axios";
import { useEffect, useState } from "react";
import { IWeatherResponse } from "../types/types";

const BASE_URL = import.meta.env.VITE_WEATHER_API_URL;

export const useWeatherApi = (city: string) => {
    const [data, setData] = useState<IWeatherResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const getImageUrl = (icon: string) => {
        return `https://openweathermap.org/img/wn/${icon}@2x.png`;
    }; 


    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);

            try {
                const result = await axios.get(
                    `${BASE_URL}/weather/history?city=${city}`
                );

                setData(result.data.weather);
            } catch (error) {
                setIsError(true);
            }

            setIsLoading(false);
        };

        fetchData();
    }, [city]);

    return { data, isLoading, isError, getImageUrl };
};
