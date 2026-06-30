import mongoose from "mongoose";

const seoSchema = new mongoose.Schema(
  {
    pageName: { type: String, required: true }, // Örn: Uygulamalar
    pageKey: { type: String, required: true, unique: true }, // Örn: apps (URL ve kod içinde tanımak için)
    title: { type: String, required: true }, // Başlık
    description: { type: String }, // Açıklama
    keywords: { type: String }, // Anahtar Kelimeler
    canonicalUrl: { type: String }, // Canonical URL
    robots: { type: String, default: "index, follow" }, // Arama motoru bot ayarı
    jsonLd: { type: String }, // Gönderdiğin o JSON kodunu tutacağımız yer
  },
  { timestamps: true }
);

const Seo = mongoose.models.Seo || mongoose.model("Seo", seoSchema);
export default Seo;