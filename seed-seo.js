const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://omegletest:omegle123@cluster0.uvvzgg2.mongodb.net/omegle_admin?appName=Cluster0";

const seoSchema = new mongoose.Schema(
  {
    pageName: { type: String, required: true },
    pageKey: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    keywords: { type: String },
    canonicalUrl: { type: String },
    robots: { type: String, default: "index, follow" },
    jsonLd: { type: String },
  },
  { timestamps: true }
);

const Seo = mongoose.models.Seo || mongoose.model("Seo", seoSchema);

const seoData = [
  {
    pageName: "Home",
    pageKey: "home",
    title: "Omegle Test - Best Random Video Chat App",
    description: "Connect with strangers worldwide in real-time video chat with omegletest.online. Safe, fast, and 100% anonymous.",
    keywords: "omegle alternative, random video chat, talk to strangers, omegle test, live chat",
    canonicalUrl: "https://omegletest.online/",
    robots: "index, follow",
    jsonLd: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": "https://omegletest.online/",
      "name": "Omegle Test",
      "description": "Connect with strangers worldwide in real-time video chat."
    }, null, 2)
  },
  {
    pageName: "Contact Us",
    pageKey: "contact",
    title: "Contact Us | Omegle Test",
    description: "Got a question, feedback, or need help? Our team is here for you. Contact Omegle Test support team.",
    keywords: "contact omegle test, support, help",
    canonicalUrl: "https://omegletest.online/contact",
    robots: "index, follow",
    jsonLd: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "url": "https://omegletest.online/contact",
      "name": "Contact Us | Omegle Test",
      "description": "Get in touch with the Omegle Test support team."
    }, null, 2)
  },
  {
    pageName: "Terms and Conditions",
    pageKey: "terms",
    title: "Terms and Conditions | Omegle Test",
    description: "Read the terms and conditions for using Omegletest.online. Information about user conduct, age restrictions, and moderation.",
    keywords: "terms and conditions, terms of service, omegle test rules",
    canonicalUrl: "https://omegletest.online/terms",
    robots: "index, follow",
    jsonLd: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "url": "https://omegletest.online/terms",
      "name": "Terms and Conditions | Omegle Test"
    }, null, 2)
  },
  {
    pageName: "Privacy Policy",
    pageKey: "privacy",
    title: "Privacy Policy | Omegle Test",
    description: "Read the privacy policy for using Omegletest.online. Learn how we protect your data and maintain your anonymity.",
    keywords: "privacy policy, data protection, anonymous chat privacy",
    canonicalUrl: "https://omegletest.online/privacy",
    robots: "index, follow",
    jsonLd: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "url": "https://omegletest.online/privacy",
      "name": "Privacy Policy | Omegle Test"
    }, null, 2)
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB baglandi.");

    for (const data of seoData) {
      await Seo.findOneAndUpdate(
        { pageKey: data.pageKey },
        { $set: data },
        { upsert: true, new: true }
      );
      console.log(`${data.pageName} SEO verisi eklendi/guncellendi.`);
    }

    console.log("Islem basariyla tamamlandi!");
    process.exit(0);
  } catch (err) {
    console.error("Hata:", err);
    process.exit(1);
  }
}

seed();
