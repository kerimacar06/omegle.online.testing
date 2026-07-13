/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');

const pages = [
  { path: 'app/page.tsx', key: 'home' },
  { path: 'app/apps/page.tsx', key: 'apps' },
  { path: 'app/contact/page.tsx', key: 'contact' },
  { path: 'app/privacy/page.tsx', key: 'privacy' },
  { path: 'app/terms/page.tsx', key: 'terms' }
];

pages.forEach(page => {
  let content = fs.readFileSync(page.path, 'utf8');
  
  // Add getFromCache/setInCache import if missing
  if (!content.includes('getFromCache')) {
    content = content.replace(/import Seo from ['"]@\/models\/Seo['"];/, 'import Seo from "@/models/Seo";\nimport { getFromCache, setInCache } from "@/lib/ramCache";');
  }

  // Replace Seo.findOne with cached block
  const seoFindPattern = new RegExp(`const seoData = await Seo\\.findOne\\(\\{ pageKey: '${page.key}' \\}\\);`, 'g');
  
  const replacement = `const cacheKey = 'seo_${page.key}';
    let seoData = getFromCache(cacheKey);
    if (!seoData) {
      seoData = await Seo.findOne({ pageKey: '${page.key}' }).lean();
      if (seoData) setInCache(cacheKey, seoData, 300);
    }`;

  content = content.replace(seoFindPattern, replacement);
  
  // Fix getFaqJsonLd in app/page.tsx
  if (page.path === 'app/page.tsx') {
    content = content.replace(/const faqs = await Faq\.find\(\{ isActive: true \}\)\.sort\(\{ order: 1, createdAt: -1 \}\);/, 
    `let faqs = getFromCache('all_faqs_active');
    if (!faqs) {
      faqs = await Faq.find({ isActive: true }).sort({ order: 1, createdAt: -1 }).lean();
      if (faqs) setInCache('all_faqs_active', faqs, 300);
    }`);
  }

  fs.writeFileSync(page.path, content);
  console.log('Fixed ' + page.path);
});

