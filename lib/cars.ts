import carsData from "../data/cars.json";
import type { Car } from "./types";

const cars = carsData as Car[];

export function getAllCars(): Car[] {
  return cars;
}

export function getCarById(id: string): Car | undefined {
  return cars.find((car) => car.id === id);
}

export function getCarsByType(type: "new" | "pre-owned"): Car[] {
  return cars.filter((car) => car.type === type);
}
