import database from "../config/mongodb";
import { Product } from "@/types";

class ProductModel {
  static collection() {
    return database.collection<Product>("products");
  }

  static async getAll(page: number, limit: number, query?: string) {
    const filter = query ? { name: { $regex: query, $options: "i" } } : {};

    const offset = (page - 1) * limit;
    const products = await this.collection()
      .find(filter)
      .limit(limit)
      .skip(offset)
      .toArray();
    return products;
  }

  static async getBySlug(slug: string) {
    const product = await this.collection().findOne({ slug: slug });
    return product;
  }
}

export default ProductModel;
