interface InfoItemProps {
    label: string;
    value: string | null | undefined;
};
interface CompanyInfo {
    isin: string;
    exchange: string;
    sector: string;
    industry: string;
}
export default function CompanyInfoItems({companyInfo}: {companyInfo: CompanyInfo}) {

    const InfoItem = ({ label, value }: InfoItemProps) => (
        <div className="flex items-baseline gap-2">
            <span className="text-gray-400 text-sm font-medium w-20">{label}:</span>
            <span className="text-white">{value || 'N/A'}</span>
        </div>
    )
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                <InfoItem label="ISIN" value={companyInfo.isin} />
                <InfoItem label="Exchange" value={companyInfo.exchange} />
                <InfoItem label="Sector" value={companyInfo.sector} />
                <InfoItem label="Industry" value={companyInfo.industry} />
            </div>
        </div>

    )
}