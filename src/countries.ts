import lifeExpectancyData from './life.json';

type LifeExpectancyEntry = {
  country: string;
};

export const COUNTRIES: string[] = (lifeExpectancyData as LifeExpectancyEntry[])
  .map((entry) => entry.country)
  .sort((a, b) => a.localeCompare(b));
