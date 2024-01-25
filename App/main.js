import { getWeatherData } from "./weather.module.js";
import { consola } from "consola";
import { stdin, stdout } from "node:process";
import readline from "node:readline";

// Start app
const rl = readline.createInterface({
  input: stdin,
  output: stdout,
});

rl.question("Введите название города: ", async (input) => {
  const apiData = await getWeatherData(input);
  if (apiData) {
    consola.box(`Погода в городе ${input}(${apiData.country}) на данный момент: ${apiData.weatherDescript},
    температура по Цельсию ${apiData.tempC}, ощущается как ${apiData.feelsLikeC},
    температура по Фаренгейту ${apiData.tempF}, ощущается как ${apiData.feelsLikeF}`);
  }
  rl.close();
});
