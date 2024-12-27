export default function Banner() {
  const products = [
    {
      title: "UNDEFEATED ACCESSORIES",
      image:
        "https://undefeated.com/cdn/shop/files/rug_infeed.jpg?v=1729268642&width=900",
    },
    {
      title: "UNDEFEATED X NEW ERA NY YANKEES 59FIFTY FITTED",
      image:
        "https://undefeated.com/cdn/shop/files/2024-09-12_undftdxnew-era_yankees_editorial3655.jpg?v=1729268584&width=900",
    },
    {
      title: "UNDEFEATED X LOS ANGELES DODGERS X NEW ERA",
      image:
        "https://undefeated.com/cdn/shop/files/2024-09-30_undftdxnewera_dodgers_editorial0996.jpg?v=1729268440&width=900",
    },
    {
      title: "UNDEFEATED X CONVERSE ONE STAR ACADEMY PRO OX",
      image:
        "https://undefeated.com/cdn/shop/files/converse_still2.jpg?v=1729782794&width=900",
    },
  ];

  return (
    <div className="px-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Image */}
        <div className="relative">
          <img
            src="https://undefeated.com/cdn/shop/files/B7A0690.jpg?v=1731078835&width=900"
            alt="Varsity Jacket"
            className="w-full h-[550px] object-cover"
          />
          <div className="absolute bottom-4 left-4 text-white">
            <p className="text-xl font-bold">UNDEFEATED X SETTLEMIER&apos;S</p>
            <p className="text-lg">VARSITY JACKET</p>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative">
          <img
            src="https://undefeated.com/cdn/shop/files/000089890013.jpg?v=1729267596&width=900"
            alt="UACTP X GARDAREIDE EINARSSON"
            className="w-full h-[550px] object-cover"
          />
          <div className="absolute bottom-4 left-4 text-white">
            <p className="text-xl font-bold">UACTP X GARDAREIDE</p>
            <p className="text-lg">EINARSSON</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        {products.map((product, index) => (
          <div key={index} className="relative">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-auto object-cover"
            />
            <p className="mt-2 text-lg font-medium text-black">
              {product.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
