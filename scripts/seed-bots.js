/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require('mongoose');

// MONGODB_URI artık kod içine gömülü değil — .env.local dosyasından okunuyor.
if (!process.env.MONGODB_URI) {
  try {
    const fs = require('fs');
    const envFile = fs.readFileSync('.env.local', 'utf-8');
    envFile.split('\n').forEach(line => {
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (match) process.env[match[1].trim()] = match[2].trim();
    });
  } catch {}
}

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('MONGODB_URI ortam değişkeni bulunamadı. .env.local dosyasını kontrol edin.');
}

const botSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    country: { type: String, required: true },
    gender: { type: String, required: true },
    character: { type: String, required: true },
    status: { type: String, default: "Active" },
    autoMessage: { type: String },
    timing: { type: Number, default: 3000 },
  },
  { timestamps: true }
);

const Bot = mongoose.models.Bot || mongoose.model("Bot", botSchema);

const names = ["Alex", "Jordan", "Taylor", "Casey", "Morgan", "Riley", "Cameron", "Quinn", "Avery", "Peyton", 
               "Skyler", "Rowan", "Reese", "Dakota", "Hayden", "Emerson", "Charlie", "Finley", "Eden", "Harley"];

const countries = ["USA", "UK", "Canada", "Australia", "Germany", "France", "Spain", "Italy"];
const genders = ["Male", "Female", "Couple"];
const characters = ["Romantic", "Funny", "Friendly", "Shy", "Outgoing"];

const seedBots = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB baglandi. Botlar ekleniyor...");

    // Önceki botları temizlemek isterseniz aşağıdaki satırı açabilirsiniz:
    // await Bot.deleteMany({});

    for (let i = 0; i < 20; i++) {
      const name = names[i % names.length];
      const country = countries[Math.floor(Math.random() * countries.length)];
      const gender = genders[Math.floor(Math.random() * genders.length)];
      const character = characters[Math.floor(Math.random() * characters.length)];
      
      // 5 tanesi Inactive, geri kalanı Active
      const status = i < 5 ? "Inactive" : "Active"; 
      
      const autoMessage = `Hi, I am ${name} from ${country}! Let's chat.`;
      const timing = Math.floor(Math.random() * 3000) + 1000;

      await Bot.create({
        name,
        country,
        gender,
        character,
        status,
        autoMessage,
        timing
      });
      
      console.log(`${name} eklendi (${status})`);
    }

    console.log("20 adet bot basariyla eklendi!");
    process.exit(0);
  } catch (error) {
    console.error("Hata:", error);
    process.exit(1);
  }
};

seedBots();

