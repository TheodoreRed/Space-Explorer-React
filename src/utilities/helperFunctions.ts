/* import OpenAI from "openai";
import SpaceEvent from "../models/SpaceEvent";

const openai = new OpenAI();

const chatGPT = async (spaceEvent: SpaceEvent) => {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Expand greatly on this space event: ${spaceEvent.name} Date:${spaceEvent.date} Short Description: ${spaceEvent.description}.`,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(chatCompletion.choices[0].message.content);
};
 */
