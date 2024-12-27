import Banner from "@/components/Banner";
import Jumbotron from "@/components/Jumbotron";
import Carousel from "@/components/Carousel";
import { Product } from "@/types";
import Link from "next/link";
import Card from "@/components/Card";

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    cache: "no-store",
  });

  const products: Product[] = await res.json();

  return (
    <>
      <Jumbotron />
      <section className="block">
        <div className="mx-10">
          <div className="mt-8 mb-2 flex gap-8">
            <h3 className="m-0 flex-1 leading-none">UNDEFEATED HOLIDAY 24</h3>
            <div className="leading-none uppercase">
              <Link
                href="/products"
                className="text-[#888] no-underline bg-transparent flex items-center gap-1"
              >
                View All
              </Link>
            </div>
          </div>
        </div>
        <Carousel products={products} />
      </section>
      <Link className="block" href="/products">
        <Banner />
      </Link>
      <div className="mx-10 my-4">
        <h3 className="text-[#222323] text-xl text-center uppercase mb-6">
          New Arrivals
        </h3>
        <div className="flex justify-center flex-wrap gap-4">
          {products.map((product) => {
            return (
              <div className="flex flex-col items-center" key={product._id}>
                <Card data={product} />
              </div>
            );
          })}
        </div>
        <div className="text-center mt-6">
          <Link
            href="/products"
            className="inline-block uppercase bg-[#1c1d1d] text-white text-md font-thin px-8 py-4 hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-400"
          >
            View All New Arrivals
          </Link>
        </div>
      </div>
    </>
  );
}
