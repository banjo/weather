import { FC } from "react";
import { useWeatherApi } from "../hooks/useWeatherApi";
import { IWeatherResponse } from "../types/types";
import Temperature from "./Temperature";
import Day from "./Day";

type WeatherProps = {
    data: IWeatherResponse;
};

const Weather: FC<WeatherProps> = (props) => {
    const { data } = props;
    const { getImageUrl } = useWeatherApi();

    const sortedByDate = data.summaries.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const today = sortedByDate[0];
    const rest = sortedByDate.slice(1);

    return (
        <div className="flex flex-col items-center w-7/12">
            <div className="flex flex-col items-center">
                <div className="text-white text-5xl"> {data.city}</div>
                <div>
                    <img src={getImageUrl(today.icon)} alt="Today" />
                </div>
                <div className="text-slate-300 text-6xl font-light">
                    {today.current} °
                </div>
                <div className="text-white text-xl font-light capitalize mt-2">
                    {today.description}
                </div>
                <div className="flex flex-row space-x-8 text-slate-300 mt-8">
                    <Temperature title="Min" temp={today.min} />
                    <Temperature title="Max" temp={today.max} />
                    <Temperature title="Mean" temp={today.mean} />
                    <Temperature title="Median" temp={today.median} />
                </div>
            </div>
            <hr className="divider w-full my-8" />
            <div className="flex flex-row space-x-8">
                {rest.map((summary, index) => {
                    return <Day summary={summary} key={index} />;
                })}
            </div>
        </div>
    );
};

export default Weather;
