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
      {/* KIRI: Daftar Invoice */}
      <div className="flex-[1.5] flex flex-col gap-4">
        {/* Search & Header */}
        <div className="flex flex-col gap-2">
           <h2 className="text-xl font-bold text-slate-800">Riwayat Penjualan</h2>
           <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input placeholder="Cari nomor struk..." className="pl-10" />
           </div>
        </div>
        <div className="flex-1">Area Tabel List...</div>
      </div>

      {/* KANAN: Detail Struk */}
      <aside className="flex-1">Area Detail Struk...</aside>
    </div>
  );
};

export default InvoicePage;