# --- 1. AŞAMA: Bağımlılıkları kur ---
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# --- 2. AŞAMA: Uygulamayı derle (build) ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# --- 3. AŞAMA: Sadece çalıştırmak için gerekenleri al (image küçük kalsın) ---
# next.config.ts'teki output: "standalone" sayesinde Next.js sadece gerçekten
# kullanılan node_modules dosyalarını .next/standalone içine kendisi topluyor —
# node_modules'ün tamamını kopyalamaya gerek kalmıyor, image çok daha küçük oluyor.
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
