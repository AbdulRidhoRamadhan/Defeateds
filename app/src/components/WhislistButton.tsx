"use client";

import { HeartIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";

export default function LikeButton({ productId }: { productId: string }) {
  const handleLike = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlists`,
        {
          method: "POST",
          body: JSON.stringify({ productId }),
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );

      if (!res.ok) throw new Error("Failed to add wishlist");

      Swal.fire({
        title: "Success",
        text: "Add to wishlist success",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "An unknown error occurred",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <button
      onClick={() => handleLike()}
      className="flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-300"
    >
      <HeartIcon className="size-6" />
    </button>
  );
}
