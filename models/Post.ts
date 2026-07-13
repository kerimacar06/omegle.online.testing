import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    breadcrumb: { type: String },
    description: { type: String },
    coverImage: { type: String },
    content: { type: String },
    alternativeAppsContent: { type: String, default: '' },
    rating: { type: Number, default: 5 },
    voteCount: { type: Number, default: 0 },
    pros: { type: [String], default: [] },
    cons: { type: [String], default: [] },
    author: { type: String, default: "Omegle Test" },
    authorImage: { type: String, default: "" },
    faqs: [
      {
        question: { type: String },
        answer: { type: String }
      }
    ],
    status: { type: String, enum: ['Published', 'Draft'], default: 'Published' },
    // Gerçek silme yerine soft delete: çöp kutusu özelliği geri yükleme yapabilsin diye
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;