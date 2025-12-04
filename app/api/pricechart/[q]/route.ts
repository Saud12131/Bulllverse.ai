import { NextResponse } from "next/server";
import { chromium } from "playwright";

export async function GET(
  req: Request,
  context: { params: Promise<{ q: string }> }
) {
  const { q } = await context.params;

  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // STEP 1 — open NSE homepage (generate cookies)
    await page.goto("https://www.nseindia.com/", {
      waitUntil: "domcontentloaded",
    });

    // STEP 2 — call chart API using REAL browser request
    const apiUrl = `https://www.nseindia.com/api/chart-databyindex?index=${q}&preopen=true`;

    const response = await page.goto(apiUrl, {
      waitUntil: "networkidle",
    });

    if (!response) {
      await browser.close();
      return NextResponse.json(
        { error: 'Failed to load the price chart data' },
        { status: 500 }
      );
    }

    const json = await response.json();
    await browser.close();

    return NextResponse.json(json);
  } catch (e: any) {
    console.error("PLAYWRIGHT ERROR:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
