import { average, max, median, min } from "../../helpers/arrayHelpers";
import {
    getDateFromUnix,
    getEarlierDate,
    getUnixTime,
    isToday,
} from "../../helpers/dateHelpers";
import {
    getCoordinatesForCity,
    getWeatherForDay,
} from "../../providers/openWeather";
import { ICompleteWeatherData } from "../../providers/openWeather/openWeatherTypes";
import { ServiceResult } from "../../types/types";
import {
    IFiveDaysSummaryResponse,
    IWeatherServiceResponse,
    IWeatherSummary,
} from "./weatherTypes";

const AMOUNT_OF_DAYS = 5;

export const getLastFiveDaysWeatherSummary = async (
    city: string
): Promise<IWeatherServiceResponse<IFiveDaysSummaryResponse>> => {
    const coordinates = await getCoordinatesForCity(city);

    if (!coordinates || coordinates.length === 0) {
        return {
            status: ServiceResult.BAD_REQUEST,
            errorMessage: "bad request, invalid city",
            value: null,
        };
    }

    const { lat, lon, name } = coordinates[0];
    const lastDays = await getLastDays(AMOUNT_OF_DAYS, lat, lon);

    if (!lastDays) {
        return {
            status: ServiceResult.ERROR,
            errorMessage: "could not fetch data from open weather",
            value: null,
        };
    }

    const summaries = getSummariesForDays(lastDays);

    if (summaries === null) {
        return {
            status: ServiceResult.ERROR,
            errorMessage: "could not calculate weather data",
            value: null,
        };
    }

    return {
        status: ServiceResult.SUCCESS,
        errorMessage: null,
        value: { summaries: summaries, city: name },
    };
};

// PRIVATE HELPERS
const getSummariesForDays = (
    days: ICompleteWeatherData[]
): IWeatherSummary[] | null => {
    const summary = days.reduce((summary, currentDay) => {
        if (currentDay === null) return summary;

        return [...summary, getSummaryForDay(currentDay)];
    }, [] as IWeatherSummary[]);

    return summary;
};

const getSummaryForDay = (day: ICompleteWeatherData): IWeatherSummary => {
    const hourlyTemperature = day.hourly.map((h) => h.temp);

    const currentDay = getDateFromUnix(day.current.dt);
    const correctSummary = isToday(currentDay) ? day.current : day.hourly[12];

    const weather = correctSummary.weather[0];

    return {
        date: getDateFromUnix(day.current.dt).toDateString(),
        current: Number(correctSummary.temp.toFixed(1)),
        mean: average(hourlyTemperature),
        median: median(hourlyTemperature),
        min: min(hourlyTemperature),
        max: max(hourlyTemperature),
        description: weather?.description,
        icon: weather.icon,
    };
};

const getLastDays = async (days: number, lat: number, lon: number) => {
    const requests = [];

    for (let i = 0; i < days; i++) {
        const getDay = getWeatherForDay({
            lat,
            lon,
            dt: getUnixTime(getEarlierDate(i)),
        });

        requests.push(getDay);
    }

    try {
        const allDays = await Promise.all(requests);

        // quick fix for TS error
        const validDays = [] as ICompleteWeatherData[];
        for (const day of allDays) {
            if (day === null) {
                return null;
            }

            validDays.push(day);
        }

        return validDays;
    } catch (error) {
        console.log(error);
        return null;
    }
};
