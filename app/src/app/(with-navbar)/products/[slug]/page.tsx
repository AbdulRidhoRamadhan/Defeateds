import { Product } from "@/types";
import LikeButton from "@/components/WhislistButton";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${params.slug}`,
    {
      cache: "no-store",
    }
  );
  const product: Product = await res.json();

  const websiteName = "Always First";

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${product.description} - ${websiteName}`,
    openGraph: {
      images: [`${product.thumbnail}`, ...previousImages],
    },
  };
}

export default async function ProductDetail({
  params,
}: {
  params: { slug: string };
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${params.slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return <div>Product not found</div>;
  }

  const product: Product = await res.json();

  const sizes = [28, 30, 32, 34, 36, 38];
  const colors = ["#1c2c59", "#e7e6e1"];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8 p-5">
        <div className="flex-1 grid grid-cols-1 gap-4">
          <img src={product.thumbnail} alt={product.name} className="w-full" />
        </div>

        <div className="flex-1">
          <div className="sticky top-8">
            <h1 className="text-xl font-light">{product.name}</h1>
            <p className="text-xl text-gray-500 mt-2">
              Rp {product.price.toLocaleString("id-ID")},00
            </p>
            <p className="text-sm text-gray-400 mt-2">SKU: {product.slug}</p>
            <p className="mt-4 text-gray-600">{product.excerpt}</p>
            <LikeButton productId={product._id} />
            <div className="mt-6">
              <h3 className="text-lg font-medium">Color</h3>
              <div className="flex gap-4 mt-2">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    className="w-10 h-10 rounded-full border-2 border-gray-300 active:border-black"
                    style={{ backgroundColor: color }}
                  ></button>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-medium">Size</h3>
              <div className="flex gap-2 mt-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className="px-4 py-2 border rounded border-gray-300 active:bg-black active:text-white"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <button className="mt-6 w-full text-[#717171] bg-[#f6f6f6] py-3 rounded font-light active:bg-black active:text-white">
              SELECT AN OPTION
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 p-5">
        <div className="flex-1 grid grid-cols-1 gap-4">
          <img src={product.images[1]} alt={product.name} className="w-full" />
        </div>
        <div className="flex-1 grid grid-cols-1 gap-4">
          <img src={product.images[2]} alt={product.name} className="w-full" />
        </div>
      </div>
    </div>
  );
}
