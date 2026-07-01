const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://omegletest:omegle123@cluster0.uvvzgg2.mongodb.net/omegle_admin?appName=Cluster0";

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
