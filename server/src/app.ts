import express from "express";
const morgan = require("morgan");
import routeWeather from "./routes/weather";

const app = express();

app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/weather", routeWeather);

export default app;
