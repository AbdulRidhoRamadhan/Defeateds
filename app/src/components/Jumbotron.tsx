import Link from "next/link";

export default function Jumbotron() {
  return (
    <Link href={"/products"}>
      <div className="relative bg-gray-100 mx-10">
        <div className="relative h-[560px] w-full flex items-end bg-gray-50">
          <img
            src="https://undefeated.com/cdn/shop/files/HO24_Drop1_Wide_banner.jpg?v=1730474078&width=1800"
            alt="Undefeated Holiday 24 Drop 2"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-500 opacity-30"></div>
          <div className="relative text-white">
            <h1 className="text-xl font-thin md:text-2xl lg:text-3xl pl-3 pb-2">
              UNDEFEATED HOLIDAY 24 DROP 1
            </h1>
          </div>
        </div>
      </div>
    </Link>
  );
}
