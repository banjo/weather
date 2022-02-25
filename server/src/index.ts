import app from "./app";
require("dotenv").config();

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`server running on port: ${port}`);
}).on("error", (e) => console.error(e));
