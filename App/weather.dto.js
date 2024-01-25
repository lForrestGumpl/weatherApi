export class WeatherDto {
  /** @type {string} */
  name;
  /** @type {string} */
  country;
  /** @type {string} */
  weatherDescript;
  /** @type {string} */
  feelsLikeC;
  /** @type {string} */
  feelsLikeC;
  /** @type {number} */
  tempC;
  /** @type {number} */
  tempF;

  constructor(data) {
    this.name = data.location.name;
    this.country = data.location.country;
    this.weatherDescript = data.current.condition.text;
    this.tempC = data.current.temp_c;
    this.tempF = data.current.temp_f;
    this.feelsLikeC = data.current.feelslike_c;
    this.feelsLikeF = data.current.feelslike_f;
  }
}
