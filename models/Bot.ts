import mongoose from "mongoose";

const botSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    country: { type: String, required: true },
    gender: { type: String, required: true }, // Male, Female, Couple vb.
    character: { type: String, required: true }, // Romantic, Funny, Adult vb.
    status: { type: String, default: "Active" }, // Active, Inactive
    autoMessage: { type: String }, // Bota özel ilk karşılama mesajı
    timing: { type: Number, default: 3000 }, // Mesaj gönderme süresi (milisaniye)
  },
  { timestamps: true }
);

const Bot = mongoose.models.Bot || mongoose.model("Bot", botSchema);
export default Bot;