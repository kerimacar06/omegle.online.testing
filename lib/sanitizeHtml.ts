import sanitizeHtml from "sanitize-html";

/**
 * Admin panelinden (Quill editörü) gelen zengin metin içeriğini
 * dangerouslySetInnerHTML ile basmadan önce temizler — script/event-handler
 * enjeksiyonuna (XSS) karşı güvenlik katmanı.
 */
export function sanitizePostHtml(html: string): string {
  // Editörden/yapıştırmadan gelen içerikte kelimeler arasına normal boşluk yerine
  // &nbsp; (bölünemez boşluk) sızabiliyor; bu da mobilde satırın hiç kırılamayıp
  // taşmasına ya da kelimenin ortasından zorla bölünmesine yol açıyor. Normal
  // boşluğa çeviriyoruz ki tarayıcı kelime sınırlarında doğal şekilde sarabilsin.
  const normalizedHtml = html.replace(/&nbsp;/gi, " ").replace(/ /g, " ");

  return sanitizeHtml(normalizedHtml, {
    allowedTags: [
      "p", "br", "strong", "b", "em", "i", "u", "s", "blockquote",
      "h1", "h2", "h3", "h4", "h5", "h6",
      "ul", "ol", "li",
      "a", "img", "span",
      "table", "thead", "tbody", "tr", "th", "td",
    ],
    allowedAttributes: {
      a: ["href", "target", "class"],
      img: ["src", "alt", "width", "height", "class"],
      span: ["class"],
      "*": ["class"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    // Dış linkler her zaman target="_self" ile açılsın (mevcut davranışla aynı)
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { target: "_self" }),
    },
  });
}
