import WishlistModel from "@/db/models/WishlistModel";

export async function GET(request: Request) {
  const userId = request.headers.get("x-user-id") as string;
  if (!userId) {
    return Response.json({
      message: "User Id is required",
      status: 400,
    });
  }
  const wishlist = await WishlistModel.getAll(userId);
  return Response.json(wishlist);
}

export async function POST(request: Request) {
  const userId = request.headers.get("x-user-id") as string;
  console.log(userId);

  const { productId } = await request.json();
  if (!userId) {
    return Response.json({
      message: "User Id is required",
      status: 400,
    });
  }
  await WishlistModel.addWishlist({ productId, userId });
  return Response.json({ message: "post whishlist success" });
}

export async function DELETE(request: Request) {
  try {
    const userId = request.headers.get("x-user-id") as string;
    const { productId } = await request.json();
    if (!userId) {
      return Response.json({
        message: "User Id is required",
        status: 400,
      });
    }

    if (!productId) {
      return Response.json({
        message: "Product Id is required",
        status: 400,
      });
    }
    await WishlistModel.deleteWishlist({ productId, userId });
    return Response.json({ message: "delete whishlist success" });
  } catch {
    return Response.json({ message: "delete whishlist failed" });
  }
}
