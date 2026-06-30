"use client";

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

export default function Editor({ value, onChange }: EditorProps) {
  return (
    <div className="h-full">
      <ReactQuill theme="snow" value={value} onChange={onChange} className="h-full" />
    </div>
  );
}