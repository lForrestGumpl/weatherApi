import dotenv from "dotenv";
const result = dotenv.config();

if (result.error) {
    throw result.error;
}

export const TOKEN = process.env.WEATHER_API_TOKEN;
export const API_BASE = process.env.WEATHER_API_PATH;