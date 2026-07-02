"use client";

import { useRouter } from "next/navigation";

export function RestoreButton({ id }: { id: string }) {
  const router = useRouter();

  const handleRestore = async () => {
    try {
      const res = await fetch(`/api/posts/${id}/restore`, { method: "PUT" });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Geri yükleme işlemi başarısız oldu.");
      }
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  return (
    <button onClick={handleRestore} className="px-4 py-2 text-sm font-medium text-green-600 bg-white border border-gray-200 rounded-md hover:bg-green-50 transition">
      Restore
    </button>
  );
}

export function PermanentDeleteButton({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm("Bu yazıyı KALICI OLARAK silmek istediğinize emin misiniz? Bu işlem geri alınamaz!");
    
    if (confirmed) {
      try {
        const res = await fetch(`/api/posts/${id}/permanent`, { method: "DELETE" });
        if (res.ok) {
          router.refresh();
        } else {
          alert("Kalıcı silme işlemi başarısız oldu.");
        }
      } catch (error) {
        console.error("Hata:", error);
      }
    }
  };

  return (
    <button onClick={handleDelete} className="px-4 py-2 text-sm font-bold text-white bg-red-600 border border-red-700 rounded-md hover:bg-red-700 transition shadow-sm">
      Permanent Delete
    </button>
  );
}
