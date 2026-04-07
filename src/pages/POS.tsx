import React, { useState, useMemo } from 'react';
// Perhatikan kurung kurawal pada import products
import { products } from "@/dummies/product"; 
import type { TProduct } from "@/lib/model";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Search, ShoppingCart, Plus, Minus, Trash2, Package } from "lucide-react";

type TCartItem = TProduct & { quantity: number };

const POSPage: React.FC = () => {
  const [cart, setCart] = useState<TCartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Logic: Add to cart
  const addToCart = (product: TProduct) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  // Logic: Reducing quantity
  const removeFromCart = (id: number) => {
    setCart((current) => {
      const item = current.find((i) => i.id === id);
      if (item?.quantity === 1) {
        return current.filter((i) => i.id !== id);
      }
      return current.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  };

  // Product filter
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.sell_price * item.quantity, 0);
  }, [cart]);

  const formatIDR = (price: number) => 
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);

  return (
    <div className="flex gap-6 h-[calc(100vh-140px)] overflow-hidden">  
      {/*======== Products grid Area =========*/}
      <div className="flex-[2.5] flex flex-col min-h-0 gap-4">
        <div className="relative shrink-0">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Cari produk atau scan barcode..." 
            className="pl-10 h-11"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex-1 min-h-0">
        <ScrollArea className="h-full pr-4">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 pb-10">
            {filteredProducts.map((product) => (
              <Card 
                key={product.id}
                onClick={() => addToCart(product)}
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
      {/* ========= Cart Area ========= */}
      <aside className="flex-1 bg-white border rounded-2xl shadow-xl flex flex-col min-w-[360px] overflow-hidden">
        <div className="p-5 border-b bg-slate-50 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-slate-700">Daftar Pesanan</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setCart([])} className="text-red-500 text-xs">
            Clear All
          </Button>
        </div>

        <div className="flex-1 min-h-0">
        <ScrollArea className="h-full px-5">
          {cart.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-slate-300">
              <ShoppingCart className="h-12 w-12 mb-2 opacity-20" />
              <p className="text-sm bold">Tidak ada item yang ditambahkan</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {cart.map((item) => ( 
                <div key={item.id} className="py-4 space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <h5 className="font-bold text-sm text-slate-800 leading-tight">{item.name}</h5>
                      <p className="text-xs text-slate-400 mt-1 italic">{formatIDR(item.sell_price)} / {item.product_unit.name}</p>
                    </div>
                    <p className="font-black text-sm text-slate-700">{formatIDR(item.sell_price * item.quantity)}</p>
                  </div>
                  
                  <div className="flex items-center justify-start gap-2">
                    <div className="flex items-center border rounded-lg bg-white shadow-sm overflow-hidden">
                      <button onClick={() => removeFromCart(item.id)} className="p-1.5 hover:bg-slate-50">
                        {item.quantity === 1 ? <Trash2 className="h-3.5 w-3.5 text-red-500" /> : <Minus className="h-3.5 w-3.5" />}
                      </button>
                      <span className="px-3 text-sm font-bold text-slate-700">{item.quantity}</span>
                      <button onClick={() => addToCart(item)} className="p-1.5 hover:bg-slate-50 border-l">
                        <Plus className="h-3.5 w-3.5 text-primary" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        </div>
        
        <div className="p-6 bg-slate-900 text-white rounded-t-3xl shrink-0">
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-slate-400 text-sm">
              <span>Subtotal</span>
              <span>{formatIDR(totalPrice)}</span>
            </div>
            <Separator className="bg-slate-700" />
            <div className="flex justify-between items-center">
              <span className="font-medium">Jumlah Total</span>
              <span className="text-3xl font-black text-primary">{formatIDR(totalPrice)}</span>
            </div>
          </div>
          <Button 
            className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl" 
            disabled={cart.length === 0}
          >
            CHECKOUT 
          </Button>
        </div>
      </aside>
    </div>
  );
};

export default POSPage;