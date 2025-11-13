import clientPromise from "@/lib/mongo";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ symbol: string }> }
) {
  try {
    const { symbol } = await context.params; 

    const client = await clientPromise;
    const db = client.db("stocks_db");
    const collection = db.collection("stocks");
   const result = await collection.findOne({symbol});
   return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
