// src/pages/Stok.tsx
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Store, Package, History, ArrowRight } from "lucide-react";

const mockStockData = [
  {
    id: 1,
    name: "Kertas kado kecil",
    barcode: "900602202519",
    unit: "PCS",
    branches: [
      { id: 'pandaan', name: 'STORE PANDAAN', stock: 19 },
      { id: 'mojokerto', name: 'STORE MOJOKERTO', stock: 0 },
      { id: 'jombang', name: 'STORE JOMBANG', stock: 1 },
      { id: 'mojosari', name: 'STORE MOJOSARI', stock: 0 },
      { id: 'porong', name: 'STORE PORONG', stock: 42 },
    ]
  }
];

const StokPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedBranch, setSelectedBranch] = useState<any>(null);

  // Product Filter
  const filteredProducts = mockStockData.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.barcode.includes(searchTerm)
  );

  return (
    <div className="flex gap-6 h-[calc(100vh-140px)] overflow-hidden">
   <div className="flex-[1.5] flex flex-col min-h-0 gap-4">
      <div className="relative shrink-0">
         <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
         <Input 
            placeholder="Cari produk..." 
            className="pl-10 h-11 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
         />
      </div>
      <ScrollArea className="flex-1 bg-white border rounded-xl p-4 shadow-sm">
         {!selectedProduct ? (
         // 1. Product view after search
         <div className="space-y-2">
            {filteredProducts.map(product => (
            <Card 
               key={product.id}
               onClick={() =>
               setSelectedProduct(product)}
               className="p-4 cursor-pointer hover:border-primary group transition-all"
               >
               <div className="flex justify-between items-center">
                  <div>
                     <h4 className="font-bold text-slate-700">{product.name} # {product.barcode}</h4>
                     <p className="text-xs text-slate-400 mt-1">Total Stok di semua cabang: {product.branches.reduce((a,b) => a+b.stock, 0)}</p>
                  </div>
                  <ArrowRight size={16} className="text-slate-300 group-hover:text-primary transition-colors" />
               </div>
            </Card>
            ))}
         </div>
         ) : (

         // 2. Store branch view after onclick product
         <div className="animate-in fade-in slide-in-from-left-2 duration-300">
            <button 
               onClick={() => {setSelectedProduct(null); setSelectedBranch(null);}}
            className="text-xs font-bold text-primary mb-4 flex items-center gap-1 hover:underline"
            >
            ← Kembali ke pencarian
            </button>
            <h3 className="font-black text-lg text-slate-800 mb-4">{selectedProduct.name}</h3>
            <table className="w-full text-sm">
               <thead>
                  <tr className="text-slate-400 border-b">
                     <th className="text-left py-3 font-black text-[10px] uppercase tracking-widest">No</th>
                     <th className="text-left py-3 font-black text-[10px] uppercase tracking-widest">Nama Cabang</th>
                     <th className="text-right py-3 font-black text-[10px] uppercase tracking-widest">Stok</th>
                  </tr>
               </thead>
               <tbody className="divide-y">
                  {selectedProduct.branches.map((branch: any, index: number) => (
                  <tr 
                     key={branch.id}
                     onClick={() =>
                     setSelectedBranch(branch)}
                     className={`cursor-pointer hover:bg-slate-50 transition-colors ${selectedBranch?.id === branch.id ? 'bg-slate-50' : ''}`}
                     >
                     <td className="py-4 text-slate-500 font-mono">{index + 1}</td>
                     <td className="py-4 font-bold text-slate-700">{branch.name}</td>
                     <td className={`py-4 text-right font-black ${branch.stock > 0 ? 'text-slate-800' : 'text-red-400'}`}>
                        {branch.stock}
                     </td>
                  </tr>
                  ))}
               </tbody>
            </table>
         </div>
         )}
      </ScrollArea>
   </div>
   <aside className="flex-1 bg-white border rounded-xl shadow-xl flex flex-col overflow-hidden">
      <div className="bg-slate-800 p-4 text-white flex items-center gap-2">
         <Package size={18} />
         <h3 className="font-bold text-sm uppercase tracking-tight">Detail Produk</h3>
      </div>
      <ScrollArea className="flex-1">
         {selectedBranch ? (
         <div className="p-6 space-y-8 animate-in fade-in duration-500">
            {/* ===== Product details ===== */}
            <div className="space-y-3">
               {[
               { label: 'Nama Produk', value: selectedProduct.name },
               { label: 'Barcode', value: selectedProduct.barcode },
               { label: 'Lokasi', value: selectedBranch.name },
               { label: 'Satuan', value: selectedProduct.unit },
               { label: 'Stok Saat Ini', value: selectedBranch.stock, highlight: true },
               ].map((info, i) => (
               <div key={i} className="flex justify-between items-center text-xs border-b border-slate-50 pb-2">
                  <span className="text-slate-400 font-medium">{info.label}</span>
                  <span className={`font-bold ${info.highlight ? 'text-primary text-lg' : 'text-slate-700'}`}>
                  {info.value}
                  </span>
               </div>
               ))}
            </div>
            {/* Product activuty in the store */}
            <div>
               <h4 className="flex items-center gap-2 font-black text-[10px] text-slate-400 uppercase tracking-widest mb-4">
                  <History size={14} />
                  Daftar Pergerakan Stok
               </h4>
               <table className="w-full text-[11px]">
                  <thead>
                     <tr className="text-slate-400 border-b">
                        <th className="text-left py-2">Tanggal</th>
                        <th className="text-right py-2">Masuk</th>
                        <th className="text-right py-2">Keluar</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y text-slate-600">
                     <tr>
                        <td className="py-3">19/02/2025, 22:15</td>
                        <td className="text-right text-green-600 font-bold">+2</td>
                        <td className="text-right text-slate-300">0</td>
                     </tr>
                     <tr>
                        <td className="py-3">25/02/2026, 10:34</td>
                        <td className="text-right text-slate-300">0</td>
                        <td className="text-right text-red-500 font-bold">-1</td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
         ) : (
         <div className="h-full flex flex-col items-center justify-center text-slate-300 p-10 text-center">
            <Store size={48} className="mb-4 opacity-20" />
            <p className="text-sm font-medium">Pilih cabang terlebih dahulu untuk melihat detail pergerakan stok</p>
         </div>
         )}
      </ScrollArea>
   </aside>
</div>
  );
};

export default StokPage;