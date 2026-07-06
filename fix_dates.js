/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require('mongoose');

const MONGO_URI = "mongodb+srv://omegletest:REDACTED-ROTATED@cluster0.uvvzgg2.mongodb.net/omegle_admin?appName=Cluster0";

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

