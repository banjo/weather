import Loader from "./components/Loader";
import Error from "./components/Error";
import Weather from "./components/Weather";
import { useWeatherApi } from "./hooks/useWeatherApi";
import { useDebounce } from "./hooks/useDebounce";
import { useState } from "react";

const DEFAULT_CITY = "goteborg";

function App() {
    const [city, setCity] = useState(DEFAULT_CITY);

    const { debounce } = useDebounce(city);
    const { data, isLoading, isError } = useWeatherApi(
        debounce || DEFAULT_CITY
    );

    return (
        <div className="flex justify-center items-center flex-col bg-slate-700 w-screen h-screen">
            {isLoading && <Loader />}

            {isError && (
                <Error
                    title="Ops!"
                    description="Could not fetch data from open weather, try again"
                />
            )}

            <input
                type="text"
                className="my-5"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />

            {data && <Weather data={data} />}
        </div>
    );
}

export default App;
