import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createTokenMetadata } from './controller/tokenController';

dotenv.config();

const app = express();

// Hata Aldığın Yer: process.env.PORT undefined olabilir uyarısı için 
// '3001' gibi bir default değer atıyoruz veya string'e zorluyoruz.
const PORT: string | number = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// 1. Sağlık Kontrolü (Health Check)
app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("Monad Hackathon Backend is Running! 🚀");
});

/**
 * 2. Token & Twitter Metadata Üretimi
 * Playwright işlemi uzun sürebileceği için async/await yapısını 
 * Express içinde güvenli bir sarmalayıcı (wrapper) ile kullanıyoruz.
 */
app.post("/api/generate", async (req: Request, res: Response, next: NextFunction) => {
  try {
    // createTokenMetadata'nın içinde req.body.twitterUsername kontrolü yapıldığından emin ol
    await createTokenMetadata(req, res);
  } catch (error) {
    // Beklenmedik bir hata olursa crash'i önleyip hata yakalayıcıya gönderir
    next(error);
  }
});

// 3. Global Hata Yakalayıcı (Error Handler)
// Bu kısım "Object is possibly undefined" hatalarının runtime'da uygulamayı patlatmasını engeller.
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Internal Server Error:", err);
  res.status(500).json({ 
    success: false, 
    error: err?.message || "Sunucu tarafında teknik bir hata oluştu." 
  });
});

// Server Başlatma
app.listen(PORT, () => {
  console.log(`
  ==============================================
  🚀 Server başarıyla başlatıldı!
  📡 Adres: http://localhost:${PORT}
  🛠  Endpoint: POST /api/generate
  ==============================================
  `);
});