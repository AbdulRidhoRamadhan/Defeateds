"use client";

import { useState } from "react";
import Card from "@/components/Card";
import { Product } from "@/types";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

interface CarouselProps {
  products: Product[];
  itemsPerPage?: number;
}

export default function Carousel({
  products,
  itemsPerPage = 4,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const canShowPrev = currentIndex > 0;
  const canShowNext = currentIndex < totalPages - 1;

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(-${(currentIndex * 100) / itemsPerPage}%)`,
        }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              flex: `0 0 ${100 / itemsPerPage}%`,
            }}
            className="px-4"
          >
            <Card data={product} />
          </div>
        ))}
      </div>

      {canShowPrev && (
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-black p-2"
        >
          <ArrowLeftIcon className="size-6" />
        </button>
      )}
      {canShowNext && (
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-black p-2"
        >
          <ArrowRightIcon className="size-6" />
        </button>
      )}
    </div>
  );
}
