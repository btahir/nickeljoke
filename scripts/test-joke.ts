import { streamText } from "ai";
import { generateUniqueJokePrompt } from "../src/lib/joke-generator";

async function testJoke() {
  try {
    console.log("🎭 Testing unique joke generation...\n");
    
    const topic = "dating";
    console.log(`Base Topic: ${topic}\n`);
    
    // Generate 3 different prompts to show variety
    for (let i = 1; i <= 3; i++) {
      console.log(`--- Test ${i} ---`);
      
      const uniquePrompt = generateUniqueJokePrompt(topic);
      
      console.log(`Prompt: ${uniquePrompt}\n`);
      
      const result = streamText({
        model: "xai/grok-4-fast-non-reasoning",
        prompt: uniquePrompt,
      });

      console.log("Generated joke:");
      console.log("================");
      
      let jokeText = "";
      for await (const textPart of result.textStream) {
        process.stdout.write(textPart);
        jokeText += textPart;
      }
      
      console.log("\n================\n");
    }
    
    console.log("🎉 All tests completed!");
    
  } catch (error) {
    console.error("❌ Error generating joke:", error);
    process.exit(1);
  }
}

testJoke();