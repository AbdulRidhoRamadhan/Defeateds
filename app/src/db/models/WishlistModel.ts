import { ObjectId } from "mongodb";
import database from "../config/mongodb";

class WishlistModel {
  static collection() {
    return database.collection("wishlist");
  }

  static async addWishlist(payload: { productId: string; userId: string }) {
    const existingWishlist = await this.collection().findOne({
      productId: new ObjectId(payload.productId),
      userId: new ObjectId(payload.userId),
    });

    if (existingWishlist) {
      throw new Error("Wishlist already exists");
    }

    const wishlist = await this.collection().insertOne({
      productId: new ObjectId(payload.productId),
      userId: new ObjectId(payload.userId),
      createdAt: new Date(),
    });
    return wishlist;
  }

  static async getAll(userId: string) {
    const agg = [
      {
        $match: {
          userId: new ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "productDetail",
        },
      },
      {
        $unwind: {
          path: "$productDetail",
          preserveNullAndEmptyArrays: true,
        },
      },
    ];
    const wishlist = await this.collection().aggregate(agg).toArray();
    return wishlist;
  }

  static async deleteWishlist(payload: { productId: string; userId: string }) {
    const wishlist = await this.collection().deleteOne({
      productId: new ObjectId(payload.productId),
      userId: new ObjectId(payload.userId),
    });

    if (wishlist.deletedCount === 0) {
      throw new Error("Wishlist not found");
    }

    return { message: "Wishlist deleted successfully" };
  }
}

export default WishlistModel;
