// Работа с API погоды и приведение в формат для вывода
import { WeatherDto } from "./weather.dto.js";
import { API_BASE, TOKEN } from "./config.js";
import consola from "consola";
import { writeFile, readFile } from "fs/promises";
import { callError, getPath } from "./utils.js";

const url = (currentCity) =>
  `${API_BASE}current.json?key=${TOKEN}&q=${currentCity}`;
const catchFilePath = getPath("weatherTemp.json");
const cacheLifeTime = 5 * 60 * 1000;

/**
 * Retrieves weather data for a given city using the specified URL and cache mechanism.
 *
 * @param {string} city - The name of the city for which weather data is to be retrieved.
 * @return {Promise<WeatherDto>} A promise that resolves to the weather data for the specified city.
 */
export async function getWeatherData(city) {
  const get = async (city) => {
    try {
      const response = await fetch(url(city), {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Не удалось получить данные о погоде");
      } else {
        consola.success("Данные о погоде получены");
      }

      let data = await response.json();

      return new WeatherDto(data);
    } catch (_) {
      callError(_);
    }
  };

  const cache = await readCache();

  if (city in cache) {
    if (cache[city]?.time + cacheLifeTime >= Date.now()) {
      return cache[city].data;
    } else {
      delete cache[city];
      let data = await get(city);
      catchingData(city, data);
      return data;
    }
  } else {
    let data = await get(city);
    catchingData(city, data);
    return data;
  }
}

/**
 * Asynchronously saves the provided data to a file after converting it to a JSON string.
 *
 * @param {any} data - the data to be saved
 * @return {void}
 */
async function catchingData(city, data) {
  const cache = { ...(await readCache()), [city]: { time: Date.now(), data } };

  await writeFile(catchFilePath, JSON.stringify(cache, null, 2), "utf8");
  consola.success(
    `Данные записаны во временное хранилище. Время хранения: ${
      cacheLifeTime / 1000
    } ceк`
  );
}

/**
 * Asynchronously reads the cache data from the specified file path.
 *
 * @return {object} The parsed cache data
 */
async function readCache() {
  // obj[city] -> {time, data}
  let result = {};

  try {
    const data = await readFile(catchFilePath, "utf8");
    if (data === "") {
      await writeFile(catchFilePath, "{}");
    } else {
      result = JSON.parse(data);
    }
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeFile(catchFilePath, "{}");
    } else {
      callError(error);
    }
  }

  return result;
}

/**
 * Asynchronous function for handling errors.
 *
 * @param {any} _ - The value to check for being an instance of Error.
 * @return {Error} an unknown error if the input is not an instance of Error.
 */

// Комментарий к коду
// [ ] используй fs/promises для работы с файлами => async/await
// [ ] При попытки считать файл, если нету, то создаем новый и делаем запрос, ответ в DTO записываем в файл
// [ ] Как можно хранить кеш
// let cache = {
//   [url / city]: {
//     time: Date.now(),
//     data: DTO,
//   },
// };

// В таком случае, ище ищем наш город, в нем смотрим если дата меньше чем 30 минут назад, то возвращаем data (DTO), иначе перезаписываем дату на новую и кидаем туда данные с ответа от запроса

// [x] используй fetch для работы с API
