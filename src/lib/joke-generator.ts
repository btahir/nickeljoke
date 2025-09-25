export interface JokeElements {
  styles: string[];
  angles: string[];
  qualityModifiers: string[];
}

export const jokeElements: JokeElements = {
  styles: [
    "observational",
    "self-deprecating", 
    "witty one-liner",
    "clever wordplay",
    "ironic",
    "relatable"
  ],
  
  angles: [
    "the absurdity of",
    "the reality of",
    "what it's really like when",
    "the truth about",
    "the struggle of",
    "the weird thing about"
  ],
  
  qualityModifiers: [
    "Make it punchy and memorable",
    "Focus on a relatable universal truth", 
    "Use clever wordplay or double meaning",
    "Make it surprisingly insightful",
    "Build to an unexpected punchline",
    "Keep it sharp and concise"
  ]
};

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}


export function generateUniqueJokePrompt(topic: string): string {
  // Select quality-focused elements
  const style = getRandomElement(jokeElements.styles);
  const angle = getRandomElement(jokeElements.angles);
  const qualifier = getRandomElement(jokeElements.qualityModifiers);
  
  // Build a quality-focused prompt
  const prompt = `Create a ${style} joke about ${angle} ${topic}. ${qualifier}. Just return the joke, nothing else.`;
  
  return prompt;
}

