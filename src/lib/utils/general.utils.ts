export const SHINY_PROBABILITY = 4096;
export const slugify = (text: string) => text.trim().toLowerCase().replace(/\s+/g, '-');
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const getShinyProbability = (max: number = SHINY_PROBABILITY) =>
	Math.floor(Math.random() * max) + 1 === 1;
