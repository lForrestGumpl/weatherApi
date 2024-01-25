import { detect } from "langdetect";
import i18next from "i18next";
import i18nextFsBackend from "i18next-fs-backend";
import { getPath } from "./utils.js";
import path from "path";

const appDirectory = getPath();
export function getWeatherInfoCurrLang(
  input,
  cityName,
  country,
  weatherDescript,
  tempC,
  feelsLikeC,
  tempF,
  feelsLikeF
) {
  const detectedLanguage = detect(input);
  console.warn(detectedLanguage);
  i18next.use(i18nextFsBackend).init({
    lng: "ru",
    backend: {
      loadPath: path.join(appDirectory, `{{lng}}.json`),
    },
  });
  return i18next.t(
    `weatherInfo`,
    { cityName },
    { country },
    { weatherDescript },
    { tempC },
    { feelsLikeC },
    { tempF },
    { feelsLikeF }
  );
}
