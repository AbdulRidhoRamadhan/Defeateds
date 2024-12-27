import ProductModel from "@/db/models/ProductModel";
import errorHandler from "@/helpers/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const query = searchParams.get("query") || undefined;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "8");

    console.log({ query, page, limit }, "<<<parameter");

    const products = await ProductModel.getAll(page, limit, query);

    return NextResponse.json(products);
  } catch (error) {
    return errorHandler(error);
  }
}
