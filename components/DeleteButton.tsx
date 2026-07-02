"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    // Silmeden önce kullanıcıya emin misin diye sorarız
    const confirmed = confirm("Bu yazıyı çöp kutusuna taşımak istediğinize emin misiniz?");
    
    if (confirmed) {
      try {
        const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
        if (res.ok) {
          router.refresh(); // Silme başarılı olursa tabloyu anında yenile
        } else {
          alert("Silme işlemi başarısız oldu.");
        }
      } catch (error) {
        console.error("Hata:", error);
      }
    }
  };

  return (
    <button onClick={handleDelete} className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-gray-200 rounded-md hover:bg-red-50 transition">
      Delete
    </button>
  );
}