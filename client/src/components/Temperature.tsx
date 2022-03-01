import { FC } from "react";

type TemperatureProps = {
    title: string;
    temp: number;
};

const Temperature: FC<TemperatureProps> = (props) => {
    const { title, temp } = props;

    return (
        <div className="flex flex-col items-center">
            <div className="text-3xl">{temp} °</div>
            <div className="text-base">{title}</div>
        </div>
    );
};

export default Temperature;
