import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    order: { type: Number, default: 0 }, // Sıralama için
    isActive: { type: Boolean, default: true } // Sitede görünsün mü?
  },
  { timestamps: true }
);

const Faq = mongoose.models.Faq || mongoose.model("Faq", faqSchema);
export default Faq;