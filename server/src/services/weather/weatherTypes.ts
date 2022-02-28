import { ServiceResult } from "../../types/types";

export interface IWeatherServiceResponse<T> {
    status: ServiceResult;
    errorMessage: string | null;
    value: T | null;
}

export interface IWeatherSummary {
    date: string;
    current: number;
    mean: number;
    median: number;
    min: number;
    max: number;
}
