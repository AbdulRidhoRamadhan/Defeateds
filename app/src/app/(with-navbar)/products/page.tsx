"use client";

import Card from "@/components/Card";
import { Product } from "@/types";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function AllProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?page=${page}&limit=4&query=${query}`
      );
      const newProducts: Product[] = await res.json();

      setProducts((prevProducts) => {
        const existingIds = new Set(prevProducts.map((product) => product._id));
        const uniqueNewProducts = newProducts.filter(
          (product) => !existingIds.has(product._id)
        );
        return [...prevProducts, ...uniqueNewProducts];
      });

      setHasMore(newProducts.length > 0);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (page === 1) {
      setProducts([]);
    }
    fetchProducts();
  }, [page, query]);

  return (
    <>
      <div className="flex justify-center items-center my-6 ">
        <input
          type="text"
          className="border p-2 rounded w-1/3 text-black bg-white "
          placeholder="Search product ..."
          value={query}
          onChange={(e) => {
            e.preventDefault();
            setQuery(e.target.value);
            setPage(1);
          }}
        />
      </div>

      <InfiniteScroll
        dataLength={products.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={hasMore}
        loader={<p>Loading...</p>}
        endMessage={
          <p className="text-center m-10 text-2xl text-black italic">
            You have reached the end of our products.
          </p>
        }
      >
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5">
          {products.map((el) => (
            <Card data={el} key={el.slug} />
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
}
