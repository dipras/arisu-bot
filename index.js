import { Client, GatewayIntentBits, Events } from "discord.js";
import { arisuMisuhMp4, arisuNoMisuh, momoiNig, arisuHikari, momoiSatria } from "./assets";
const token = process.env.SECRET_TOKEN;
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
client.on(Events.ClientReady, () => {
  console.log(`Arisu is ready`);
});

const chooseVariaties = [
  "Arisu pilih",
  "Tentu Arisu suka",
  "Arisu sangat suka"
]

client.on(Events.MessageCreate, (msg) => {
  switch (msg.content.toLowerCase()) {
    case "arisu":
      msg.channel.send("Arisu pahlawan telah datang!");
      return;
    case "n":
    case "nig":
    case "nega":
      msg.channel.send(momoiNig);
      return;
    case "hikari":
      msg.channel.send(arisuHikari);
      return;
    case "biji":
    case "satria":
      msg.channel.send(momoiSatria);
      return;
  }

  if (msg.content.includes("arisu pisuhi dia")) {
    const userTarget =
      msg.mentions.repliedUser?.id || msg.mentions.users?.first().id;
    if (!userTarget) return;
    if (userTarget == process.env.DIPRAS_USER_ID) {
      msg.channel.send(`Tidak boleh misuh kepada tuan Dipras >=<`);
      msg.channel.send(arisuNoMisuh);
      return;
    }
    msg.channel.send(`<@${userTarget}> asu kamu`);
    msg.channel.send(arisuMisuhMp4);
    return;
  } else if (msg.content.includes("arisu pilih")) {
    let temp = msg.content.replace("arisu pilih", "").trim();
    let answers = temp.split("|");
    if (answers[0]) {
      var item = answers[Math.floor(Math.random() * answers.length)].trim();
      var text = chooseVariaties[Math.floor(Math.random() * answers.length)];
      msg.channel.send(`${text} ${item}`);
    } else {
      msg.channel.send("Format invalid");
    }
  }
});

client.login(token);
