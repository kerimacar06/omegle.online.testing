import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Lütfen .env dosyasında MONGODB_URI değişkenini tanımlayın.");
}

export const connectMongoDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection.asPromise();
    }
    
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB bağlantısı başarılı!");
  } catch (error) {
    console.log("MongoDB bağlantı hatası: ", error);
  }
};