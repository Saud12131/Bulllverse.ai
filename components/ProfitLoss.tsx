"use client"
import { useState, useEffect } from "react"

interface MetaData {
  url: string;
  fetched_at: number;
  worker: number;
  status_code: number;
}

interface ProfitLossData {
  columns?: string[];
  rows: {
    "Sales+"?: number[];
    "Expenses+"?: number[];
    "Operating Profit"?: number[];
    "OPM %"?: number[];
    "Other Income+"?: number[];
    "Interest"?: number[];
    "Depreciation"?: number[];
    "Profit before tax"?: number[];
    "Tax %"?: (number | null)[];
    "Net Profit+"?: number[];
    "EPS in Rs"?: number[];
    "Dividend Payout %"?: (number | null)[];
  };
}

interface CompanyFinancials {
  _id: string;
  symbol: string;
  company_name: string;
  meta: MetaData;
  parsed_numeric: {
    profit_loss: ProfitLossData;
  };
}

export default function ProfitLoss({ symbol }: { symbol: string }) {
    const [data, setData] = useState<CompanyFinancials | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/financials/${symbol}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();
                // Get the first profit_loss entry that has both columns and rows
                const profitLossEntry = Array.isArray(result.parsed_numeric?.profit_loss) 
                    ? result.parsed_numeric.profit_loss.find((pl: { columns?: any[]; rows?: any }) => pl?.columns && pl?.rows) 
                    : null;

                if (!profitLossEntry) {
                    throw new Error('No valid profit/loss data found');
                }

                const companyData: CompanyFinancials = {
                    ...result,
                    parsed_numeric: {
                        profit_loss: {
                            columns: profitLossEntry.columns || [],
                            rows: profitLossEntry.rows || {}
                        } as ProfitLossData
                    }
                };
                
                if (!companyData.parsed_numeric?.profit_loss?.rows) {
                    throw new Error('No profit/loss data available');
                }
                
                setData(companyData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, [symbol]);

    // Format the value based on its type
    const formatValue = (value: number | null) => {
        if (value === null || value === undefined) return '-';
        return value.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    if (loading) return <div className="text-center py-4 text-gray-400">Loading financial data...</div>;
    if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
    if (!data?.parsed_numeric?.profit_loss) return <div className="text-gray-400 p-4">No financial data available</div>;

    const profitLossData = data.parsed_numeric.profit_loss;
    
    // Define the specific metrics we want to show in order
// Update the metricsToShow array to match the exact keys in your data
const metricsToShow = [
    "Sales+",
    "Expenses+",
    "Operating Profit",
    "OPM %",
    "Other Income+",
    "Interest",
    "Depreciation",
    "Profit before tax",
    "Tax %",
    "Net Profit+",
    "EPS in Rs",
    "Dividend Payout %"
].filter(metric => {
    // Remove the space before + if it exists in the metric name
    const key = metric.replace(/\s*\+\s*$/, '+') as keyof typeof profitLossData.rows;
    return profitLossData.rows && Array.isArray(profitLossData.rows[key]);
});

    // Get years from the columns array
    const years = profitLossData.columns || [];

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Metric
                        </th>
                        {years.map((year, index) => (
                            <th 
                                key={index} 
                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                            >
                                {year}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-gray-900/50 divide-y divide-gray-700">
                    {metricsToShow.map((metric) => (
                        <tr key={metric} className="hover:bg-gray-800/50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
                                {metric}
                            </td>
                           {(() => {
    // Keep the + in the key if it exists in the metric name
    const key = metric.replace(/\s*\+\s*$/, '+') as keyof typeof profitLossData.rows;
    const values = profitLossData.rows[key];
    if (!Array.isArray(values)) return null;
    
    return values.map((value, i) => (
        <td key={i} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
            {formatValue(value)}
        </td>
    ));
})()}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}