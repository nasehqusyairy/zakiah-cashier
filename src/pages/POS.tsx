import React, { useState, useMemo } from 'react';
// Perhatikan kurung kurawal pada import products
import { products } from "@/dummies/product"; 
import type { TProduct } from "@/lib/model";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Package } from "lucide-react";

// Tipe lokal untuk Cart yang menggabungkan TProduct + quantity
type TCartItem = TProduct & { quantity: number };

const POSPage: React.FC = () => {
  const [cart, setCart] = useState<TCartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter Produk
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatIDR = (price: number) => 
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);

  return (
    <div className="flex gap-6 h-[calc(100vh-140px)] p-2">
      {/*========= AREA PRODUK =========*/}
      <div className="flex-[2.5] flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Cari produk atau scan barcode..." 
            className="pl-10 h-11"
            value={searchQuery}
          />
        </div>

        <ScrollArea className="flex-1 pr-4">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 pb-10">
            {filteredProducts.map((product) => (
              <Card 
                key={product.id}
                className="overflow-hidden cursor-pointer hover:border-primary transition-all flex flex-col group shadow-sm"
              >
                <div className="aspect-square bg-slate-100 relative flex items-center justify-center border-b">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center text-slate-300">
                      <Package className="h-10 w-10" />
                      <span className="text-[10px] mt-1 uppercase">No Image</span>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-white/90 px-2 py-0.5 rounded text-[10px] font-bold border shadow-sm">
                    Stock: {product.product_location_stock.stock}
                  </div>
                </div>
                <div className="p-3 flex flex-col flex-1 bg-white">
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-tighter">{product.sku}</span>
                  <h4 className="font-semibold text-sm line-clamp-2 min-h-[40px] mt-1 text-slate-800 italic">
                    {product.name}
                  </h4>
                  <p className="text-primary font-black text-lg mt-2">
                    {formatIDR(product.sell_price)}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

    </div>
  );
};

export default POSPage;