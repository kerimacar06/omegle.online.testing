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
  faqs: [{ question: String, answer: String }]
}, { strict: false }));

const imageMap = {
  'ometv-app-review': 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
  'chatrandom-review': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
  'emerald-chat-review': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
  'shagle-anonymous-chat': 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80',
  'camsurf-video-chat': 'https://images.unsplash.com/photo-1588196749597-9ff046892e8a?w=800&q=80',
  'chathub-video-chat': 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800&q=80',
  'chatroulette-review': 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80',
  'bazoocam-random-chat': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
  'coomeet-video-network': 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&q=80',
  'tinychat-group-video': 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
  'camgo-safe-search': 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&q=80',
  'joingy-text-video': 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&q=80'
};

async function updateImages() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB bağlandı. Resimler güncelleniyor...");

    for (const [slug, imageUrl] of Object.entries(imageMap)) {
      await Post.findOneAndUpdate(
        { slug: slug },
        { $set: { coverImage: imageUrl } }
      );
      console.log(`Fotoğraf güncellendi: ${slug}`);
    }

    console.log("Tüm fotoğraflar başarıyla yüklendi!");
  } catch (error) {
    console.error("Hata oluştu:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Bağlantı kapatıldı.");
  }
}

updateImages();

