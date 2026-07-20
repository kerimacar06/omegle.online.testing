import mongoose from "mongoose";

// Next.js'te (özellikle serverless/soğuk başlangıçlarda) aynı anda birden fazla
// istek gelirse, tek bir bağlantı sözünü (promise) globalThis üzerinde önbelleğe
// alıp herkesin aynı bağlantıyı beklemesini sağlıyoruz — üst üste binen
// mongoose.connect() çağrılarını önler.
const globalForMongoose = globalThis as unknown as {
  mongooseConnPromise: Promise<typeof mongoose> | undefined;
};

export const connectMongoDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }

  // Modül import edilirken değil, gerçekten bağlanılmaya çalışılırken kontrol
  // ediliyor — aksi halde `next build` bu dosyayı sadece import ettiğinde bile
  // (MONGODB_URI henüz set edilmemiş build ortamlarında, ör. Docker) patlar.
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error("Lütfen .env dosyasında MONGODB_URI değişkenini tanımlayın.");
  }

  if (!globalForMongoose.mongooseConnPromise) {
    globalForMongoose.mongooseConnPromise = mongoose
      .connect(MONGODB_URI, { maxPoolSize: 10 })
      .then((conn) => {
        console.log("MongoDB bağlantısı başarılı!");
        return conn;
      });
  }

  try {
    return await globalForMongoose.mongooseConnPromise;
  } catch (error) {
    // Başarısız bağlantı denemesini önbellekte tutma — sonraki çağrı yeniden denesin
    globalForMongoose.mongooseConnPromise = undefined;
    console.error("MongoDB bağlantı hatası: ", error);
    throw error;
  }
};