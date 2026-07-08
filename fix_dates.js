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
  updatedAt: Date,
  createdAt: Date
}, { strict: false }));

async function fixDates() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB bağlandı. Tarihler kontrol ediliyor...");

    const posts = await Post.find({});
    const now = new Date();
    
    for (const post of posts) {
      let needsUpdate = false;
      const updateData = {};

      if (!post.createdAt) {
        updateData.createdAt = now;
        needsUpdate = true;
      }
      
      if (!post.updatedAt) {
        updateData.updatedAt = now;
        needsUpdate = true;
      }

      if (needsUpdate) {
        await Post.findByIdAndUpdate(post._id, { $set: updateData });
        console.log(`Tarih eklendi: ${post.title}`);
      }
    }

    console.log("Tüm eksik tarihler başarıyla düzeltildi!");
  } catch (error) {
    console.error("Hata oluştu:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Bağlantı kapatıldı.");
  }
}

fixDates();

