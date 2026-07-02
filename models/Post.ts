import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    coverImage: { type: String },
    content: { type: String },
    alternativeAppsContent: { type: String, default: '' },
    rating: { type: Number, default: 5 },
    voteCount: { type: Number, default: 0 },
    pros: { type: [String], default: [] },
    cons: { type: [String], default: [] },
    author: { type: String, default: "Omegle Test" }, // YENİ: Yazar alanı
    // YENİ: SSS (Sıkça Sorulan Sorular) Alanı
    faqs: [
      {
        question: { type: String },
        answer: { type: String }
      }
    ],
    status: { type: String, enum: ['Published', 'Draft'], default: 'Published' },
    isDeleted: { type: Boolean, default: false } // YENİ: Çöp kutusu özelliği için soft delete flag'i
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;