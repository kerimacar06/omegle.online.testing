const mongoose = require('mongoose');

const MONGO_URI = "mongodb+srv://omegletest:omegle123@cluster0.uvvzgg2.mongodb.net/omegle_admin?appName=Cluster0";

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
