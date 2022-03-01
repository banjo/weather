export interface IWeatherSummary {
    date: string;
    current: number;
    mean: number;
    median: number;
    min: number;
    max: number;
    description: string;
    icon: string;
}

export interface IWeatherResponse {
    summaries: IWeatherSummary[];
    city: string;
}
