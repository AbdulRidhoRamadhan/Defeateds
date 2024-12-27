import ProductModel from "@/db/models/ProductModel";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const product = await ProductModel.getBySlug(params.slug);
  return Response.json(product);
}
