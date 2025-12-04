"use client";

import { useEffect, useState } from "react";

export default function LivePrice({ symbol }: { symbol: string }) {
  const [price, setPrice] = useState<number | null>(null);
  const [change, setChange] = useState<number | null>(null);
  const [changePercent, setChangePercent] = useState<number | null>(null);
  const [blink, setBlink] = useState<"up" | "down" | null>(null);

  async function load() {
    const res = await fetch(`/api/price/${symbol}`, {
      cache: "no-store",
    });
    const data = await res.json();

    if (price !== null) {
      if (data.price > price) setBlink("up");
      else if (data.price < price) setBlink("down");
    }

    setPrice(data.price);
    setChange(data.change);
    setChangePercent(data.changePercent);

    setTimeout(() => setBlink(null), 300);
  }

  useEffect(() => {
    load();
    const t = setInterval(load, 2000);
    return () => clearInterval(t);
  }, []);

 
  return (
    <div className="flex items-center gap-2">
      <div className="text-2xl font-bold text-white">
        {price !== null ? `${price}₹` : "..."}
      </div>
      <div className="flex items-center">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        <span className="ml-1 text-xs font-medium text-red-500">LIVE</span>
      </div>
    </div>
  );
}
