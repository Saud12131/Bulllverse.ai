import clientPromise from "@/lib/mongo";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ q: string }> }
) {
  try {
    const { q } = await context.params; // ← AWAIT PARAMS

    const client = await clientPromise;
    const db = client.db("stocks_db");
    const collection = db.collection("stocks");

    const results = await collection
      .find(
        {
          $or: [
            { symbol: { $regex: q, $options: "i" } },
            { name: { $regex: q, $options: "i" } },
          ],
        },
        { projection: { symbol: 1, name: 1 } }
      )
      .limit(10)
      .toArray();

    return NextResponse.json(results);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
