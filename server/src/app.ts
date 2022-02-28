import express from "express";
import cors from "cors";
const morgan = require("morgan");
import routeWeather from "./routes/weather";

const app = express();

app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));


app.use("/weather", routeWeather);

export default app;
