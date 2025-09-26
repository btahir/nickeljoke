function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export const redditStyles: string[] = [
  'My wife told me to stop impersonating a flamingo. I had to put my foot down.',
  'I went to buy some camo pants but couldn\'t find any.',
  'I failed math so many times at school, I can\'t even count.',
  'I used to have a handle on life, but then it broke.',
  'I was wondering why the frisbee kept getting bigger and bigger, but then it hit me.',
  'I heard there were a bunch of break-ins over at the car park. That is wrong on so many levels.',
  'I want to die peacefully in my sleep like my grandfather, not screaming and yelling like the passengers in his car.',
  'When life gives you melons, you might be dyslexic.',
  'Don\'t you hate it when someone answers their own questions? I do.',
  'I told him to be himself; that was pretty mean, I guess.',
  'It takes a lot of balls to golf the way I do.',
  'I know they say that money talks, but all mine says is “Goodbye.”',
  'My father has schizophrenia, but he\'s good people.',
  'The problem with kleptomaniacs is that they always take things literally.',
  'I can\'t believe I got fired from the calendar factory. All I did was take a day off.',
  'Most people are shocked when they find out how bad I am as an electrician.',
  'Never trust atoms; they make up everything.',
  'My wife just found out I replaced our bed with a trampoline. She hit the ceiling!',
  'I was addicted to the hokey pokey, but then I turned myself around.',
  'I used to think I was indecisive. But now I\'m not so sure.',
  'A Freudian slip is when you say one thing but mean your mother.',
  'What did Cinderella do when she reached the ball? Gagged.',
  'Why didn\'t Barbie ever get pregnant? Because Ken always came in another box.',
  'What did the leper say to the prostitute? Keep the tip.',
  'What\'s the difference between a hooker and a drug dealer? A hooker can wash her crack and re-sell it.',
  'What do you call the sweat between 2 rednecks having sex? Relative humidity.',
  'Two men broke into a drugstore and stole all the Viagra. The police put out an alert to be on the lookout for the two hardened criminals.',
  'What\'s six inches long, hard as a rock, and full of semen? The sock under my bed.',
  'Why do Scotsmen wear kilts? Because a sheep can hear a zipper from 20 meters away.',
  'What does the Mafia and a pussy have in common? One slip of the tongue and you\'re in deep shit.',
  'What\'s green and smells like pork? Kermit\'s finger.'
];

export function generateUniqueJokePrompt(topic: string): string {
  const style = getRandomElement(redditStyles);
  return [
    `You are writing a fresh one-liner about ${topic}.`,
    `Use the following joke ONLY as vibe inspiration, not a template: "${style}".`,
    `Do NOT copy its wording, subject, setup, rhythm, or structure.`,
    `Do NOT mention Reddit, inspiration, or the original joke.`,
    `One sentence. Max 15 words. No quotation marks. Output only the joke.`,
    `If the vibe clashes with the topic, ignore the vibe and prioritize originality.`
  ].join(' ');
}
