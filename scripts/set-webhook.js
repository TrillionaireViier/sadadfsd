const lt = require("localtunnel");
const https = require("https");
require("dotenv").config();

(async () => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    console.error("Missing TELEGRAM_BOT_TOKEN in .env");
    process.exit(1);
  }

  console.log("Starting localtunnel on port 3000...");
  const tunnel = await lt({ port: 3000 });
  
  console.log(`Tunnel is open at: ${tunnel.url}`);
  const webhookUrl = `${tunnel.url}/api/webhook/telegram`;
  
  console.log(`Setting webhook to: ${webhookUrl}`);
  
  const apiEndpoint = `https://api.telegram.org/bot${token}/setWebhook?url=${encodeURIComponent(webhookUrl)}`;
  
  https.get(apiEndpoint, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log("Telegram API Response:", data);
      console.log("Keep this process running to keep the tunnel open!");
    });
  }).on("error", (err) => {
    console.error("Error setting webhook:", err);
  });

  tunnel.on("close", () => {
    console.log("Tunnel closed");
  });
})();
