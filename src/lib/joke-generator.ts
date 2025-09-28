function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export const jokes: string[] = [
  'My wife told me to stop impersonating a flamingo. I had to put my foot down.',
  'I went to buy some camo pants but couldn\'t find any.',
  'I failed math so many times at school, I can\'t even count.',
  'I used to have a handle on life, but then it broke.',
  'I was wondering why the frisbee kept getting bigger and bigger, but then it hit me.',
  'I heard there were a bunch of break-ins over at the car park. That is wrong on so many levels.',
  'When life gives you melons, you might be dyslexic.',
  'Don\'t you hate it when someone answers their own questions? I do.',
  'I told him to be himself; that was pretty mean, I guess.',
  'It takes a lot of balls to golf the way I do.',
  'I know they say that money talks, but all mine says is "Goodbye."',
  'My father has schizophrenia, but he\'s good people.',
  'The problem with kleptomaniacs is that they always take things literally.',
  'I can\'t believe I got fired from the calendar factory. All I did was take a day off.',
  'Most people are shocked when they find out how bad I am as an electrician.',
  'Never trust atoms; they make up everything.',
  'My wife just found out I replaced our bed with a trampoline. She hit the ceiling!',
  'I was addicted to the hokey pokey, but then I turned myself around.',
  'I used to think I was indecisive. But now I\'m not so sure.',
  'A Freudian slip is when you say one thing but mean your mother.',
  'I bought the world\'s worst thesaurus yesterday. Not only is it terrible, it\'s terrible.',
  'I just watched a documentary about beavers. It was the best dam show I\'ve ever seen.',
  'Breaking news: Local man found dead in his home office. Details are sketchy.',
  'I used to be a banker, but I lost interest.',
  'The early bird might get the worm, but the second mouse gets the cheese.',
  'I wondered why the baseball kept getting bigger. Then it hit me.',
  'Time flies like an arrow. Fruit flies like a banana.',
  'I haven\'t slept for ten days, because that would be too long.',
  'I told my wife she should embrace her mistakes. She gave me a hug.',
  'My therapist says I have a preoccupation with vengeance. We\'ll see about that.',
  'I used to hate facial hair, but then it grew on me.',
  'What do you call a fish wearing a crown? A king fish.',
  'Why don\'t scientists trust atoms? Because they make up everything.',
  'I named my horse Mayo. Sometimes Mayo neighs.',
  'What\'s orange and sounds like a parrot? A carrot.',
  'Why don\'t eggs tell jokes? They\'d crack each other up.',
  'What do you call a sleeping bull? A bulldozer.',
  'Why did the scarecrow win an award? He was outstanding in his field.',
  'What do you call a bear with no teeth? A gummy bear.',
  'Why don\'t skeletons fight each other? They don\'t have the guts.'
];

export function getRandomJoke(): string {
  return getRandomElement(jokes);
}
