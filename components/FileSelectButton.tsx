"use client";

import { useRef } from "react";

interface FileSelectButtonProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  accept?: string;
  label?: string;
}

export default function FileSelectButton({ onChange, accept = "image/*", label = "Dosya Seç" }: FileSelectButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="py-2 px-4 rounded-md text-sm font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 w-fit"
      >
        {label}
      </button>
      <input ref={inputRef} type="file" accept={accept} onChange={onChange} className="hidden" />
    </>
  );
}
