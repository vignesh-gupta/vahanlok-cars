import carsData from "../data/cars.json";
import type { Car } from "./types";

const cars = carsData as Car[];

export function getAllCars(): Car[] {
  return cars;
}

export function getCarById(id: string): Car | undefined {
  return cars.find((car) => car.id === id);
}
