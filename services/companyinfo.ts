import clientPromise from "@/lib/mongo";

export interface CompanyInfo {
    symbol: string;
    name: string;
    isin: string;
    exchange: string;
    sector: string;
    industry: string;
}

export async function getCompanyInfo(symbol: string): Promise<CompanyInfo | null> {
    try {
        const client = await clientPromise;
        const db = client.db("stocks_db");
        const collection = db.collection<CompanyInfo>("stocks");
        const result = await collection.findOne({ symbol });
        return result;
    } catch (err) {
        console.error("Error fetching company info:", err);
        return null;
    }
}