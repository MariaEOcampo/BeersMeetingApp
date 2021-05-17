import { configApiWeather } from "../../Config/config";

export const getWeather = async () => {
  try {
    const res = await fetch(
      `${configApiWeather.url}q=${configApiWeather.q}&cnt=${configApiWeather.cnt}&units=${configApiWeather.units}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": `${configApiWeather.headers_key}`,
          "x-rapidapi-host": `${configApiWeather.headers_host}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("err", error);
  }
};
