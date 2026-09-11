require("dotenv").config();
import { getBot, setupBot } from "../src/lib/bot";

const bot = getBot();
setupBot(bot);

console.log("Starting Telegram Bot locally in Long Polling mode...");
bot.start({
  onStart: (botInfo) => {
    console.log(`Bot @${botInfo.username} is up and running!`);
  }
});
