import { Product } from "@/types";
import Link from "next/link";

export default function CardWhislist({ data }: { data: Product }) {
  return (
    <>
      <Link href={`/products/${data.slug}`}>
        <div className="relative">
          <div className="overflow-hidden w-full">
            <div className="whitespace-nowrap m-2.5">
              <div className="inline-block w-[clamp(170px,60vw,300px)] whitespace-normal align-top">
                <div className="box-border">
                  <div className="m-3">
                    <div className="relative w-full">
                      <div className="relative block w-full bg-[#fff] transition-opacity duration-4000 ease-out hover:opacity-90">
                        <div className="relative w-full">
                          <img
                            src={data.thumbnail}
                            alt={data.name}
                            className="w-full h-auto"
                          />
                        </div>
                      </div>
                    </div>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
