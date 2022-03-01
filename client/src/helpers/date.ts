import * as dayjs from "dayjs";

export const getShortDayName = (date: string) => {
    return dayjs(date).format("ddd");
};
