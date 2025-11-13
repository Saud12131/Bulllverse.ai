import CompanyInfo from "@/components/data/companyinfo";
export default async function CompanyPage({ params }: { params: { symbol: string } }) {
  const { symbol } = await params;
  return (
    <div>
      <CompanyInfo symbol={symbol} />
    </div>
  );
}
