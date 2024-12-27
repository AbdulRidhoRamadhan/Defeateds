"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CardWhislist from "@/components/CardWhislist";
import { Wishlist } from "@/types";

export default function WishLists() {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlists`,
          {
            headers: {
              "content-type": "application/json",
              "x-user-id": "",
            },
            cache: "no-store",
          }
        );
        if (!res.ok) throw new Error("Failed to fetch wishlist");
        const data = await res.json();
        setWishlists(data);
      } catch (error: unknown) {
        setLoading(false);
        if (error instanceof Error) {
          setError(error.message);
          Swal.fire({
            title: "Error",
            text: error.message,
            icon: "error",
            confirmButtonText: "OK",
          });
        } else {
          console.error("An unexpected error occurred:", error);
          Swal.fire({
            title: "Error",
            text: "An unexpected error occurred",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const deleteFromWishlist = async (productId: string) => {
    try {
      const userId = "Authorization";
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlists`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-user-id": userId,
          },
          body: JSON.stringify({ productId }),
        }
      );

      if (!res.ok) {
        throw new Error(`Failed to remove item: ${res.status}`);
      }
      Swal.fire({
        title: "Success",
        text: "Item has been removed from wishlist",
        icon: "success",
        confirmButtonText: "OK",
      });

      setWishlists((previousWishlist) =>
        previousWishlist.filter((item) => item.productId !== productId)
      );
    } catch {
      Swal.fire({
        title: "Error",
        text: "Failed to delete item",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  if (loading) return <div>Loading...</div>;

  if (error)
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );

  return (
    <div className="px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Wishlist</h1>
      {wishlists.length === 0 ? (
        <p className="text-gray-500 text-center">
          Your wishlist is empty. Start adding some favorites!
        </p>
      ) : (
        <div className="grid xl:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {wishlists.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <CardWhislist data={item.productDetail} />
              <button
                className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
                onClick={() => deleteFromWishlist(item.productId)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
