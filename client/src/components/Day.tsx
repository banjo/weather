import { FC } from "react";
import { useWeatherApi } from "../hooks/useWeatherApi";
import { IWeatherSummary } from "../types/types";
import { getShortDayName } from "../helpers/date";

type DayProps = {
    summary: IWeatherSummary;
};

const Day: FC<DayProps> = (props) => {
    const { icon, date, max, min } = props.summary;
    const { getImageUrl } = useWeatherApi();

    const minMaxTemperature = `${min}° / ${max}°`;

    return (
        <div className="flex flex-col items-center text-white text-xl">
            <div>{getShortDayName(date)}</div>
            <img src={getImageUrl(icon)} alt="Day" />
            <div>{minMaxTemperature}</div>
        </div>
    );
};

export default Day;
