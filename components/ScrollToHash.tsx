'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function ScrollToHash() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!window.location.hash) return;

    const id = window.location.hash.slice(1);
    // İçerik (özellikle FAQ gibi veritabanından gelen bölümler) render olduktan sonra kaydırmak için küçük bir gecikme
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Kaydırma bitince URL'deki hash'i temizle. router.replace kullanıyoruz (ham
      // window.history.replaceState değil) çünkü Next'in kendi router state'inde
      // (focusAndScrollRef.hashFragment) eski hash bilgisi ayrıca tutuluyor — sadece
      // adres çubuğunu değiştirmek bunu temizlemiyor ve sonraki hash'siz "Home"
      // tıklamalarında Next bu eski değeri yanlışlıkla tekrar kullanıp #faq'a atlıyordu.
      router.replace(pathname, { scroll: false });
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, router]);

  return null;
}
