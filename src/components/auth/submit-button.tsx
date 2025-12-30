"use client";
import { useFormStatus } from "react-dom";

export function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 disabled:bg-gray-400 transition-colors"
    >
      {pending ? "Processing..." : text}
    </button>
  );
}
