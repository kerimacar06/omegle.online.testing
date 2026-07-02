"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
// Artık yeni paketimizin CSS dosyasını çağırıyoruz
import "react-quill-new/dist/quill.snow.css";

// React Quill'in React 18 uyumlu yeni versiyonunu SSR kapalı şekilde çağırıyoruz
const ReactQuill = dynamic(() => import("react-quill-new"), { 
  ssr: false,
  loading: () => <p className="p-4 text-gray-500 font-medium">Editör yükleniyor...</p>
});

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    [{ align: [] }],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  }
};

export default function Editor({ value, onChange }: EditorProps) {
  
  useEffect(() => {
    // Editör butonlarına Türkçe açıklama (tooltip) ekleme işlemi
    const addTooltips = () => {
      const tooltips: Record<string, string> = {
        '.ql-bold': 'Kalın',
        '.ql-italic': 'Eğik (İtalik)',
        '.ql-underline': 'Altı Çizili',
        '.ql-strike': 'Üstü Çizili',
        '.ql-blockquote': 'Alıntı Ekle',
        '.ql-list[value="ordered"]': 'Numaralı Liste',
        '.ql-list[value="bullet"]': 'Madde İşaretli Liste',
        '.ql-link': 'Link Ekle',
        '.ql-image': 'Resim Ekle',
        '.ql-video': 'Video Ekle',
        '.ql-clean': 'Biçimlendirmeyi Temizle',
        '.ql-header': 'Başlık Stili',
        '.ql-align': 'Metin Hizalama'
      };

      Object.entries(tooltips).forEach(([selector, title]) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => el.setAttribute('title', title));
      });
    };

    // Quill editörünün ekrana render edilmesini bekleyip başlıkları atıyoruz
    const timer = setTimeout(addTooltips, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full">
      <ReactQuill 
        theme="snow" 
        value={value} 
        onChange={onChange} 
        modules={modules}
        className="h-full" 
      />
    </div>
  );
}