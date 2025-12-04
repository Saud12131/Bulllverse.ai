import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { symbol: string } }) {
 const { symbol } = await params;
  const yahooSymbol = symbol + ".NS";

  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${yahooSymbol}`;

    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
      cache: "no-store",
    });

    const data = await res.json();
    const meta = data.chart.result[0].meta;

    return NextResponse.json({
      symbol,
      price: meta.regularMarketPrice,
      change: meta.regularMarketChange,
      changePercent: meta.regularMarketChangePercent,
      time: meta.regularMarketTime,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch live price" },
      { status: 500 }
    );
  }
}
