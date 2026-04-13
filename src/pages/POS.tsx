import React, { useState, useMemo, useEffect } from 'react';
import { products } from "@/dummies/product"; 
import type { TProduct } from "@/lib/model";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Search, ShoppingCart, Plus, Minus, Trash2, Users, UserPlus, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Popover } from '@/components/ui/popover';
import { useRef } from 'react';

export type TCartItem = TProduct & { quantity: number };

interface POSProps {
  onCheckout: (cart: TCartItem[]) => void;
}

// ======== DUMMIES =========
const salesData = [
  { id: 1, name: "Balqis Sales" },
  { id: 2, name: "Sabilatul Sales" },
  { id: 3, name: "Syuaiba Sales" }
];

const POSPage: React.FC<POSProps> = ({ onCheckout }) => {
  // For Cart's
  const [cart, setCart] = useState<TCartItem[]>(() => 
    { const savedCart = localStorage.getItem("pos_cart");
      return savedCart ? JSON.parse(savedCart) : []; });
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    localStorage.setItem("pos_cart", JSON.stringify(cart));
  }, [cart]);

  const handleClearCart = () => {
    setCart([]);
    setSelectedSales(null);
    setSelectedMember(null);
    localStorage.removeItem("pos_cart");
    localStorage.removeItem("pos_selected_sales");
    localStorage.removeItem("pos_selected_member");
  }

  
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

  // For Sales
  const [selectedSales, setSelectedSales] = useState<string | null>(() => {
    return localStorage.getItem("pos_selected_sales");
  });
  const [isSalesModalOpen, setIsSalesModalOpen] = useState(false);
  const [salesSearch, setSalesSearch] = useState("");
  const filteredSales = salesData.filter(s => s.name.toLowerCase().includes(salesSearch.toLowerCase()));
  useEffect(() => {
    if (selectedSales) {
      localStorage.setItem("pos_selected_sales", selectedSales);
    } else {
      localStorage.removeItem("pos_selected_sales");
    }
  }, [selectedSales]);

  // For Member's
  const [selectedMember, setSelectedMember] = useState<string | null>(() => {
    return localStorage.getItem("pos_selected_member");
  });
  useEffect(() => {
    if (selectedMember) {
      localStorage.setItem("pos_selected_member", selectedMember);
    } else {
      localStorage.removeItem("pos_selected_member");
    }
  }, [selectedMember]);

  // For API's
  // const [products, setProducts] = useState<TProduct[]>([]);
  // const [loading, setLoading] = useState(false);

  // Product filter
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fetching API (WIP)
  // const fetchProducts = async (keyword: string) => {
  //   try {
  //     setLoading(true);
      
  //     // NEEDS TOKEN
  //     const token = localStorage.getItem('access_token'); 

  //     const url = `https://backend-dev.secacastore.com/api/kasir/catalogues/product_search?limit=16&filter_stock=false&location=5&keyword=${keyword}`;

  //     console.log("Memanggil URL:", url);
      
  //     const response = await fetch(url, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json',
  //         ...(token && { 'Authorization': `Bearer ${token}` })
  //       }
  //     });

  //     console.log("Status response:", response.status);

  //     if (response.status === 401) {
  //       console.error("Token tidak valid atau expired");
  //       return;
  //     }

  //     const result = await response.json();
  //     console.log("Data dari api:", result);

  //     if (result && result.data) {
  //       setProducts(result.data);
  //     } else {
  //       setProducts(Array.isArray(result) ? result : []); 
  //     }
  //   } catch (error) {
  //     console.error("Gagal konek api", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {
  //     // Hanya panggil API jika minimal 1 karakter atau saat awal load
  //     fetchProducts(searchQuery);
  //   }, 500);

  //   return () => clearTimeout(delayDebounceFn);
  // }, [searchQuery]);

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
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 pb-10">
        {filteredProducts.map((product) => (
          <Card 
            key={product.id}
            onClick={() => addToCart(product)}
            className="cursor-pointer hover:border-primary transition-all flex flex-col group shadow-sm overflow-hidden border-slate-200"
          >
            <div className="p-3 border-b bg-slate-50/50 flex justify-between items-start gap-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter truncate">
                {product.sku}
              </span>
              <div className="bg-white px-2 py-0.5 rounded text-[10px] font-bold border shadow-sm shrink-0">
                STOK: {product.product_location_stock.stock}
              </div>
            </div>

            <div className="p-3 flex flex-col justify-between flex-1 bg-white group-hover:bg-slate-50/30 transition-colors">
              <h4 className="font-bold text-sm line-clamp-2 min-h-[40px] text-slate-700 leading-snug">
                {product.name}
              </h4>
              <div className="mt-3 pt-2 border-t border-dashed border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Harga</span>
                <p className="text-primary font-black text-base">
                  {formatIDR(product.sell_price)}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  </div>
</div>
      {/* ========= Cart Area ========= */}
      <aside className="flex-1 bg-white border rounded-2xl shadow-xl flex flex-col min-w-[360px] overflow-hidden">
   <div className="p-4 grid grid-cols-2 gap-2 border-b bg-slate-50/50">
      <Button 
         variant="outline" 
         className="bg-white border-primary text-primary hover:bg-primary/5 font-bold text-xs h-10 gap-2"
         onClick={() =>
         {/* Logika Member */}}
         >
         <UserPlus size={16} />
         {selectedMember || "Member"}
      </Button>
      <Dialog open={isSalesModalOpen} onOpenChange={setIsSalesModalOpen}>
         <DialogTrigger asChild>
            <Button 
               variant="outline" 
               className="bg-white border-primary text-primary hover:bg-primary/5 font-bold text-xs h-10 gap-2"
               >
               <Users size={16} />
               {selectedSales || "Sales"}
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle className="font-black italic uppercase tracking-tighter">Pilih Sales</DialogTitle>
            </DialogHeader>
            <div className="relative my-4">
               <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
               <Input 
                  placeholder="Cari nama sales..." 
                  className="pl-10"
                  value={salesSearch}
                  onChange={(e) => setSalesSearch(e.target.value)}
               />
            </div>
            <div className="max-h-[300px] overflow-y-auto space-y-1">
               {filteredSales.map((sales) => (
               <button
                  key={sales.id}
                  onClick={() =>
                  {
                  setSelectedSales(sales.name);
                  setIsSalesModalOpen(false);
                  }}
                  className="w-full text-left p-3 rounded-lg hover:bg-slate-100 font-bold text-slate-700 transition-colors flex justify-between items-center group"
                  >
                  {sales.name}
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 text-primary" />
               </button>
               ))}
            </div>
         </DialogContent>
      </Dialog>
   </div>
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
                     <button onClick={() =>
                        removeFromCart(item.id)} className="p-1.5 hover:bg-slate-50">
                        {item.quantity === 1 ? 
                        <Trash2 className="h-3.5 w-3.5 text-red-500" />
                        : 
                        <Minus className="h-3.5 w-3.5" />
                        }
                     </button>
                     <span className="px-3 text-sm font-bold text-slate-700">{item.quantity}</span>
                     <button onClick={() =>
                        addToCart(item)} className="p-1.5 hover:bg-slate-50 border-l">
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
      disabled={cart.length === 0} onClick={() => onCheckout(cart)}>CHECKOUT</Button>
   </div>
</aside>
    </div>
  );
};

export default POSPage;