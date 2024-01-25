import { resolve, join } from "path";
import consola from "consola";

export function getPath(...paths) {
  return join(resolve(), ...paths);
}

export function callError(_) {
  if (_ instanceof Error) {
    consola.error("!!! Произошла ошибка при получении данных !!!");
    consola.error(_?.stack);
    consola.error(_?.cause?.errno);
  } else {
    throw new Error("неизвестная ошибка");
  }
}
