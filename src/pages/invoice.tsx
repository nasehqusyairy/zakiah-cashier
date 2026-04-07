import React, { useMemo, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, FileText, User, Receipt, Printer, Send } from "lucide-react";
import { Calendar } from '@/components/ui/calendar';
import type { TProduct } from "@/lib/model";
import type { TInvoice } from '@/lib/model';
import { invoices } from '@/dummies/invoice';

const InvoicePage: React.FC = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<TInvoice | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Logic: Invoice Filter
  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => 
        inv.invoice_number.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const formatIDR = (val: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="flex gap-6 h-[calc(100vh-140px)]">
      {/* ========= Daftar Invoice ========= */}
      {/* Masukkan di dalam div utama */}
<div className="flex-[1.5] flex flex-col gap-4">
  <div className="flex flex-col gap-2">
    <h2 className="text-xl font-bold text-slate-800">Riwayat Penjualan</h2>
    <div className="relative">
      <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
      <Input 
        placeholder="Cari nomor struk..." 
        className="pl-10 h-11"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  </div>

  <ScrollArea className="flex-1 pr-4">
    <div className="space-y-3 pb-4">
      {filteredInvoices.map((inv) => (
        <Card 
          key={inv.id}
          onClick={() => setSelectedInvoice(inv)}
          className={`p-4 cursor-pointer transition-all border-l-4 ${
            selectedInvoice?.id === inv.id 
              ? 'border-l-primary bg-slate-50 shadow-md' 
              : 'border-l-transparent hover:border-l-slate-300'
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="font-mono text-[10px] text-slate-400">{inv.invoice_number}</p>
              <h4 className="font-bold text-slate-800">{formatIDR(inv.total_price)}</h4>
            </div>
            <span className="text-[10px] text-slate-500 font-medium">
              {inv.created_at.split(' ')[1]} WIB
            </span>
          </div>
          <div className="mt-3 flex items-center gap-4 text-[11px] text-slate-500">
            <div className="flex items-center gap-1"><User size={12} /> {inv.cashier_name}</div>
            <div className="flex items-center gap-1"><FileText size={12} /> {inv.total_items} Item</div>
          </div>
        </Card>
      ))}
    </div>
  </ScrollArea>
</div>
      {/* ========= Invoice Details ========= */}
      {/* Masukkan di sebelah div daftar invoice */}
<aside className="flex-1 bg-white border rounded-2xl shadow-sm flex flex-col overflow-hidden">
  {selectedInvoice ? (
    <>
      <div className="p-6 border-b bg-slate-50/50 text-center">
        <h3 className="font-black text-xl tracking-tighter text-slate-800">DETAIL INVOICE</h3>
        <p className="text-xs text-slate-400 font-mono mt-1">{selectedInvoice.invoice_number}</p>
      </div>

      <ScrollArea className="flex-1 p-6">
        <div className="space-y-6">
          <div className="space-y-4">
            {selectedInvoice.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start border-b border-slate-50 pb-3">
                <div className="text-sm flex-1 pr-4">
                  <p className="font-bold text-slate-700">{item.product.name}</p>
                  <p className="text-xs text-slate-400">
                    {item.quantity} x {formatIDR(item.product.sell_price)}
                  </p>
                </div>
                <p className="text-sm font-bold text-slate-800">{formatIDR(item.subtotal)}</p>
              </div>
            ))}
          </div>
          
          <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-dashed border-slate-200">
            <div className="flex justify-between text-sm text-slate-500">
              <span>Total Harga</span>
              <span className="font-semibold text-slate-700">{formatIDR(selectedInvoice.total_price)}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-500">
              <span>Bayar (Tunai)</span>
              <span>{formatIDR(selectedInvoice.total_paid)}</span>
            </div>
            <div className="flex justify-between text-lg font-black text-primary pt-2 border-t">
              <span>Kembalian</span>
              <span>{formatIDR(selectedInvoice.total_return)}</span>
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="p-4 border-t flex gap-2">
        <Button variant="outline" className="flex-1 gap-2"><Printer size={14} /> Cetak</Button>
        <Button variant="outline" className="flex-1 gap-2"><Send size={14} /> Kirim WA</Button>
      </div>
    </>
  ) : (
    <div className="flex-1 flex flex-col items-center justify-center text-slate-300 gap-2 opacity-50">
      <Receipt size={48} strokeWidth={1} />
      <p className="text-sm">Pilih struk untuk melihat detail</p>
    </div>
  )}
</aside>
    </div>
  );
};

export default InvoicePage;