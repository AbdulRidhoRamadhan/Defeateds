import { Product } from "@/types";
import LikeButton from "./WhislistButton";
import Link from "next/link";

export default function Card({ data }: { data: Product }) {
  return (
    <div className="relative">
      <div className="overflow-hidden w-full">
        <div className="whitespace-nowrap m-2.5">
          <div className="inline-block w-[clamp(170px,60vw,300px)] whitespace-normal align-top">
            <div className="box-border">
              <div className="m-3">
                <div className="relative w-full">
                  <div className="relative block w-full bg-[#fff] transition-opacity duration-4000 ease-out hover:opacity-90">
                    <div className="relative w-full">
                      <Link href={`/products/${data.slug}`}>
                        <img
                          src={data.thumbnail}
                          alt={data.name}
                          className="w-full h-auto"
                        />
                      </Link>
                      <div className="absolute top-2 right-2">
                        <LikeButton productId={data._id} />
                      </div>
                    </div>
                  </div>
                </div>
                <Link href={`/products/${data.slug}`}>
                  <div className="flex pt-1 leading-none text-base">
                    <span className="ml-3 whitespace-nowrap leading-none">
                      <span className="mr-4 flex flex-col gap-px text-[#222323]">
                        Rp {data.price?.toLocaleString("id-ID")}
                      </span>
                    </span>
                    <span className="pr-2 break-words ml-3 text-[#222323] font-semibold">
                      {data.name}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
