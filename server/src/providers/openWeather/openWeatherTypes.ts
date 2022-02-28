export interface ICoordinateResponse {
    name: string;
    lat: number;
    lon: number;
    country: string;
    state?: string;
}

export interface IWeatherParameters {
    lat: number;
    lon: number;
    dt: number;
}

export interface IWeatherData {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface IHourlyWeatherData {
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: IWeatherData[];
}

export interface ICompleteWeatherData {
    lat: string;
    lon: string;
    timezone: string;
    timezone_offset: string;
    current: IHourlyWeatherData;
    minutely: any;
    hourly: IHourlyWeatherData[];
    daily: any;
    alerts: any;
}
