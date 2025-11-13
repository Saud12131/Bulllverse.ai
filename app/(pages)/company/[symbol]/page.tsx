export default async function CompanyPage({ params }: { params: { symbol: string } }) {
  const { symbol } = await params;

  return (
    <div>
      <h1 className="text-white">Company Page {symbol}</h1>
    </div>
  );
}
