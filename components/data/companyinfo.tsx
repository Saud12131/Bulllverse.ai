import { getCompanyInfo, type CompanyInfo } from "@/services/companyinfo";

interface InfoItemProps {
  label: string;
  value: string | null | undefined;
}

const InfoItem = ({ label, value }: InfoItemProps) => (
  <div className="flex items-baseline gap-2">
    <span className="text-gray-400 text-sm font-medium w-20">{label}:</span>
    <span className="text-white">{value || 'N/A'}</span>
  </div>
);

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
                        <h2 className="text-xl font-bold text-white">{companyInfo.name}</h2>
                        <span className="text-blue-400 font-mono text-sm">{symbol.toUpperCase()}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                        <InfoItem label="ISIN" value={companyInfo.isin} />
                        <InfoItem label="Exchange" value={companyInfo.exchange} />
                        <InfoItem label="Sector" value={companyInfo.sector} />
                        <InfoItem label="Industry" value={companyInfo.industry} />
                    </div>
                </div>
            </div>
        </div>
    );
}