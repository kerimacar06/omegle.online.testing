/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require('mongoose');

// MONGO_URI artık kod içine gömülü değil — .env.local dosyasından okunuyor.
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

const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI) {
  throw new Error('MONGODB_URI ortam değişkeni bulunamadı. .env.local dosyasını kontrol edin.');
}

const Post = mongoose.models.Post || mongoose.model("Post", new mongoose.Schema({
  title: String,
  slug: String,
  description: String,
  content: String,
  alternativeAppsContent: String,
  pros: [String],
  cons: [String],
  author: String,
  coverImage: String,
  faqs: [{ question: String, answer: String }],
  rating: Number,
  voteCount: Number
}, { strict: false }));

function getRandomArbitrary(min, max) {
  return (Math.random() * (max - min) + min).toFixed(1);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function updateRatings() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB bağlandı. Yıldızlar ve oylar güncelleniyor...");

    const posts = await Post.find({});
    
    for (const post of posts) {
      const rating = parseFloat(getRandomArbitrary(4.3, 4.9));
      const voteCount = getRandomInt(85, 450);
      
      await Post.findByIdAndUpdate(
        post._id,
        { $set: { rating: rating, voteCount: voteCount } }
      );
      console.log(`Güncellendi: ${post.slug} -> Puan: ${rating}, Oy: ${voteCount}`);
    }

    console.log("Tüm uygulamaların oyları ve yıldızları başarıyla gerçekçi değerlerle dolduruldu!");
  } catch (error) {
    console.error("Hata oluştu:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Bağlantı kapatıldı.");
  }
}

updateRatings();

