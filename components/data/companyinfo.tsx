import { getCompanyInfo, type CompanyInfo } from "@/services/companyinfo";
import LivePrice from "../LivePrice";
import CompanyInfoItems from "../compnayinfoitems";
import ProfitLoss from "../ProfitLoss";

export default async function CompanyInfo({ symbol }: { symbol: string }) {
    const companyInfo = await getCompanyInfo(symbol);
    const stock_logo = `https://images.dhan.co/symbol/${symbol.toUpperCase()}.png`;
    
    if (!companyInfo) {
        return (
            <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700 text-center">
                <p className="text-gray-400">Company information not found for symbol: {symbol}</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 m-5">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Logo */}
                <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border-2 border-blue-500/30">
                    <img 
                        src={stock_logo}
                        alt={`${companyInfo.name} logo`}
                        width={80}
                        height={80}
                        className="w-full h-full object-contain p-2"
                    />
                </div>
                
                {/* Company Info */}
                <div className="flex-1">
                    <div className="mb-2">
                        <div className="flex items-baseline gap-4 flex-wrap">
                            <h2 className="text-xl font-bold text-white">{companyInfo.name}</h2>
                            <span className="text-blue-400 font-mono text-sm">{symbol.toUpperCase()}</span>
                            <div className="text-xl font-bold text-white ml-2">
                                <LivePrice symbol={symbol}/>
                            </div>
                        </div>
                    </div>
                    <div>
                    <CompanyInfoItems companyInfo={companyInfo}/>
                    </div>
                </div>
            </div>
            
            {/* Profit & Loss Card */}
            <div className="mt-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                {/* <h3 className="text-lg font-semibold text-white mb-4">Financial Performance</h3> */}
                {/* <div className="overflow-x-auto"> */}
                    {/* <ProfitLoss symbol={symbol}/> */}
                {/* </div> */}
                
            </div>
        </div>
    );
}