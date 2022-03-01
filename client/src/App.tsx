import Loader from "./components/Loader";
import Error from "./components/Error";
import Weather from "./components/Weather";
import { useWeatherApi } from "./hooks/useWeatherApi";


function App() {
    const { data, isLoading, isError } = useWeatherApi();

    return (
        <div className="flex justify-center items-center bg-slate-700 w-screen h-screen">
            {isLoading && <Loader />}

            {isError && (
                <Error
                    title="Ops!"
                    description="Could not fetch data from open weather, try again"
                />
            )}

            {data && <Weather data={data} />}
        </div>
    );
}

export default App;
