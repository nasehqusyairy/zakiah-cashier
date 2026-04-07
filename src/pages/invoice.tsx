import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, FileText, User, Receipt } from "lucide-react";
import { Calendar } from '@/components/ui/calendar';
import type { TProduct } from "@/lib/model";
import type { TInvoice } from '@/lib/model';

const InvoicePage = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<TInvoice | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex gap-6 h-[calc(100vh-120px)] overflow-hidden">
      {/* ========= Daftar Invoice ========= */}
      <div className="flex-[1.5] flex flex-col gap-4">
        {/* Search & Header */}
        <div className="flex flex-col gap-2">
           <h2 className="text-xl font-bold text-slate-800">Riwayat Penjualan</h2>
           <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input placeholder="Cari nomor struk..." className="pl-10" />
           </div>
        </div>
        <div className="flex-1">
<ScrollArea className="flex-1 pr-4">
  <div className="space-y-3">
    {/* Contoh Data Dummy Lokal */}
    {[1, 2, 3].map((i) => (
      <Card 
        key={i}
        onClick={() => setSelectedInvoice(null)} // Data Struk/Invoice
        className={`p-4 cursor-pointer transition-all hover:border-primary border-l-4 ${selectedInvoice?.id === i.toString() ? 'border-l-primary bg-slate-50' : 'border-l-transparent'}`}
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="font-mono text-xs text-slate-400">#INV-20260406-00{i}</p>
            <h4 className="font-bold text-slate-700">Rp 125.000</h4>
          </div>
          <span className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500 font-medium">
            12:4{i} WIB
          </span>
        </div>
        <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <User size={12} /> Admin
          </div>
          <div className="flex items-center gap-1">
            <FileText size={12} /> 4 Items
          </div>
        </div>
      </Card>
    ))}
  </div>
</ScrollArea>
        </div>
      </div>

      {/* ========= Invoice Details ========= */}
      <aside className="flex-1">
<aside className="bg-white border rounded-2xl shadow-sm flex flex-col overflow-hidden">
  {!selectedInvoice ? (
    <div className="flex-1 flex flex-col items-center justify-center text-slate-300 gap-2">
      <Receipt size={48} className="opacity-20" />
      <p className="text-sm">Pilih invoice untuk melihat detail</p>
    </div>
  ) : (
    <>
      <div className="p-6 border-b bg-slate-50/50 text-center">
        <h3 className="font-black text-xl tracking-tighter">STRUK PEMBAYARAN</h3>
        <p className="text-xs text-slate-400 font-mono mt-1">#INV-2024001</p>
      </div>

      <ScrollArea className="flex-1 p-6">
        <div className="space-y-4">
          <div className="flex justify-between text-xs text-slate-500 uppercase font-bold tracking-wider">
            <span>Item</span>
            <span>Total</span>
          </div>
          <div className="space-y-3">
             {/* Map item struk di sini */}
             <div className="flex justify-between items-start">
                <div className="text-sm">
                   <p className="font-medium">Pita Serut Kecil</p>
                   <p className="text-xs text-slate-400">2 x Rp 1.000</p>
                </div>
                <p className="text-sm font-bold">Rp 2.000</p>
             </div>
          </div>
          
          <div className="border-t border-dashed pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Total Harga</span>
              <span className="font-bold">Rp 2.000</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Bayar (Cash)</span>
              <span>Rp 5.000</span>
            </div>
            <div className="flex justify-between text-sm font-black text-primary border-t pt-2">
              <span>Kembalian</span>
              <span>Rp 3.000</span>
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="p-4 border-t flex gap-2 bg-slate-50">
        <Button variant="outline" className="flex-1 gap-2 text-xs">
          <FileText size={14} /> Cetak Struk
        </Button>
        <Button variant="outline" className="flex-1 gap-2 text-xs">
           Kirim WhatsApp
        </Button>
      </div>
    </>
  )}
</aside>
      </aside>
    </div>
  );
};

export default InvoicePage;