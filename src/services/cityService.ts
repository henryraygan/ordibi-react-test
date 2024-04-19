import City from "../types/City";
import citiesData from "../data/cities.json";

function getAllCities(): City[] {
  return citiesData;
}

function findClosestCities(cityName: string): City[] | undefined {
  const selectedCity = citiesData.find((city) => city.name === cityName);
  if (!selectedCity) return undefined;

  const sortedCities = citiesData
    .filter((city) => city.name !== cityName)
    .map((city) => ({
      ...city,
      distance: calculateDistance(selectedCity, city),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 3);

  return sortedCities;
}

function calculateDistance(city1: City, city2: City): number {
  const lat1 = parseFloat(city1.lat);
  const lng1 = parseFloat(city1.lng);
  const lat2 = parseFloat(city2.lat);
  const lng2 = parseFloat(city2.lng);

  const dx = lat1 - lat2;
  const dy = lng1 - lng2;
  return Math.sqrt(dx * dx + dy * dy);
}

const cityService = {
  getAllCities,
  findClosestCities,
};

export default cityService;
