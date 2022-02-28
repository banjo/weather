import dayjs from "dayjs";

export const getEarlierDate = (days: number): Date => {
    if (days === 0) return new Date();

    return dayjs(new Date()).subtract(days, "days").toDate();
};

export const getUnixTime = (date: Date): number => {
    return Math.round(date.getTime() / 1000);
};

export const getDateFromUnix = (unix: number): Date => {
    return dayjs.unix(unix).toDate();
};
