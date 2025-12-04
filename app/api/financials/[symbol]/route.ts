import clientPromise from "@/lib/mongo";
import { NextResponse } from "next/server";
export  async function GET(
  req: Request,
  context: { params: Promise<{ symbol: string }> }
) {
    try {
        const { symbol } = await context.params;
        let client = await clientPromise;
        const db = client.db("stocks_db");
        const financials = db.collection("financials");
        const data = await financials.findOne({ symbol })
        return NextResponse.json(data)
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: "Server Error" }, { status: 500 })
    }
}