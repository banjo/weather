import express from "express";
import { getLastFiveDaysWeatherSummary } from "../../services/weather/weather";
import { ServiceResult } from "../../types/types";

const router = express.Router();

router.get("/history", async (req, res) => {
    const city = req.query.city?.toString() ?? null;

    if (!city) {
        return res.status(400).send({ status: "bad request" });
    }

    const response = await getLastFiveDaysWeatherSummary(city);

    if (response.status === ServiceResult.BAD_REQUEST) {
        return res
            .status(400)
            .send({ status: response.errorMessage ?? "bad request" });
    }

    if (response.status !== ServiceResult.SUCCESS || response.value === null) {
        return res
            .status(500)
            .send({ status: response.errorMessage ?? "internal server error" });
    }

    res.status(200).json({ status: "ok", weather: response.value });
});

export default router;
