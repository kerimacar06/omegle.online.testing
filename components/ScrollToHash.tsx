'use client';

import { useEffect } from 'react';

export default function ScrollToHash() {
  useEffect(() => {
    if (!window.location.hash) return;

    const id = window.location.hash.slice(1);
    // İçerik (özellikle FAQ gibi veritabanından gelen bölümler) render olduktan sonra kaydırmak için küçük bir gecikme
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Kaydırma bitince URL'deki hash'i temizle — aksi halde sonraki "Home" tıklamalarında
      // eski #faq hash'i adres çubuğunda kalıp bu efekti yanlışlıkla tekrar tetikleyebiliyor.
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
