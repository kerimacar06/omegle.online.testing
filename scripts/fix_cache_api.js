/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const files = [
  'app/api/seo/route.ts',
  'app/api/seo/[id]/route.ts',
  'app/api/faqs/route.ts',
  'app/api/faqs/[id]/route.ts'
];
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('clearCache')) {
    content = content.replace(/import Seo from "@\/models\/Seo";/g, 'import Seo from "@/models/Seo";\nimport { clearCache } from "@/lib/ramCache";\nimport { revalidatePath } from "next/cache";');
    content = content.replace(/import Faq from "@\/models\/Faq";/g, 'import Faq from "@/models/Faq";\nimport { clearCache } from "@/lib/ramCache";\nimport { revalidatePath } from "next/cache";');
    
    content = content.replace(/await Seo.create\(body\);/g, 'await Seo.create(body);\n    clearCache();\n    revalidatePath("/", "layout");');
    content = content.replace(/await Seo.findByIdAndUpdate\(id, body\);/g, 'await Seo.findByIdAndUpdate(id, body);\n    clearCache();\n    revalidatePath("/", "layout");');
    content = content.replace(/await Seo.findByIdAndDelete\(id\);/g, 'await Seo.findByIdAndDelete(id);\n    clearCache();\n    revalidatePath("/", "layout");');
    
    content = content.replace(/await Faq.create\(body\);/g, 'await Faq.create(body);\n    clearCache();\n    revalidatePath("/", "layout");');
    content = content.replace(/await Faq.findByIdAndUpdate\(id, body\);/g, 'await Faq.findByIdAndUpdate(id, body);\n    clearCache();\n    revalidatePath("/", "layout");');
    content = content.replace(/await Faq.findByIdAndDelete\(id\);/g, 'await Faq.findByIdAndDelete(id);\n    clearCache();\n    revalidatePath("/", "layout");');
    
    fs.writeFileSync(file, content);
    console.log('Fixed ' + file);
  }
});

