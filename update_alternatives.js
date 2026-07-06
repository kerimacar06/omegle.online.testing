/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require('mongoose');

const MONGO_URI = "mongodb+srv://omegletest:REDACTED-ROTATED@cluster0.uvvzgg2.mongodb.net/omegle_admin?appName=Cluster0";

const Post = mongoose.models.Post || mongoose.model("Post", new mongoose.Schema({
  slug: String,
  alternativeAppsContent: String
}, { strict: false }));

const alternativesData = {
  "chatrandom-review": `<p><strong>Conclusion</strong></p><p><strong><a href="/apps/shagle-anonymous-chat">Shagle</a></strong> is a great alternative to Chatrandom. It's fast, fun, and free — and most importantly, it keeps that human connection alive in a digital world.</p><p>Start chatting now, meet new people, and enjoy the best Omegle alternative available online.</p>`,
  "ometv-app-review": `<p><strong>Conclusion</strong></p><p><strong><a href="/apps/camsurf-video-chat">Camsurf</a></strong> is one of the leading platforms for random video chatting. It provides a highly moderated and secure environment for all users.</p><p>Try out the safest video chat alternative today.</p>`,
  "emerald-chat-review": `<p><strong>Conclusion</strong></p><p>If you're looking for something different, <strong><a href="/apps/chatrandom-review">Chatrandom</a></strong> offers incredible filtering options and a huge userbase.</p><p>Join the fun and experience a truly global connection.</p>`,
  "shagle-anonymous-chat": `<p><strong>Conclusion</strong></p><p>While Shagle is great, <strong><a href="/apps/emerald-chat-review">Emerald Chat</a></strong> is becoming incredibly popular due to its modern interface and text-first approach.</p><p>Check it out to see why everyone is switching.</p>`,
  "camsurf-video-chat": `<p><strong>Conclusion</strong></p><p><strong><a href="/apps/ometv-app-review">OmeTV</a></strong> is an excellent alternative if you want a reliable mobile app experience and strict moderation.</p><p>Download the app and start making friends instantly.</p>`
};

async function updateAlternativeApps() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB bağlantısı başarılı.");

    for (const [slug, content] of Object.entries(alternativesData)) {
      const res = await Post.findOneAndUpdate(
        { slug: slug },
        { $set: { alternativeAppsContent: content } }
      );
      if (res) {
        console.log(`${slug} için alternatif uygulama güncellendi.`);
      } else {
        console.log(`Uyarı: ${slug} bulunamadı!`);
      }
    }

    console.log("Tüm işlemler başarıyla tamamlandı!");
  } catch (error) {
    console.error("Hata oluştu:", error);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB bağlantısı kapatıldı.");
  }
}

updateAlternativeApps();

