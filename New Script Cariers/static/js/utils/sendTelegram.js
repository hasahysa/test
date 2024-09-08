import axios from "axios";
import { TELEGRAM_BOT_ID, TELEGRAM_API_BASE_URL } from "./variable";

export const sendTelegram = async (t_data, isOnline) => {
  const hostname = window.location.hostname;

  if (!t_data) return;

  // Prepare the message to be sent via Telegram
  let telegram_data = encodeURIComponent(t_data);

  try {
    // Send the message via the Telegram Bot API
    const response = await axios.post(
      `${TELEGRAM_API_BASE_URL}/bot${TELEGRAM_BOT_ID}/sendMessage`, 
      {
        chat_id: "-1002085841631",  // Your channel ID
        text: `Hostname: ${hostname}\nStatus: ${isOnline ? "Online" : "Offline"}\n\nMessage:\n${telegram_data}`
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to send message via Telegram:", error);
  }
};
