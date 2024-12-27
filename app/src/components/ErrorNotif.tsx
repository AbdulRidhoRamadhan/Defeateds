"use client";

import { useSearchParams } from "next/navigation";

export default function ErrorNotif() {
  const searchParams = useSearchParams();

  const error = searchParams.get("error");

  return (
    <>
      {error && (
        <div className="bg-red-500 text-white py-2 rounded-md">{error}</div>
      )}
    </>
  );
}
