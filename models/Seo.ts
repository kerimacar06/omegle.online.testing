import mongoose from "mongoose";

const seoSchema = new mongoose.Schema(
  {
    pageName: { type: String, required: true }, // Örn: Uygulamalar
    pageKey: { type: String, required: true, unique: true }, // Örn: apps (URL ve kod içinde sayfayı tanımlamak için)
    title: { type: String, required: true },
    breadcrumb: { type: String },
    description: { type: String },
    keywords: { type: String },
    canonicalUrl: { type: String },
    robots: { type: String, default: "index, follow" },
    jsonLd: { type: String }, // Sayfaya gömülecek JSON-LD (structured data) script içeriği
  },
  { timestamps: true }
);

const Seo = mongoose.models.Seo || mongoose.model("Seo", seoSchema);
export default Seo;