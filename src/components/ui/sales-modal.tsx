import React, { useState } from 'react';
import { Users, Search, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

// ======== DUMMIES =========
const salesData = [
  { id: 1, name: "Balqis Sales" },
  { id: 2, name: "Sabilatul Sales" },
  { id: 3, name: "Syuaiba Sales" }
];

interface SalesModalProps {
  selectedSales: string | null;
  onSelect: (name: string) => void;
}

const SalesModal = ({ selectedSales, onSelect }: SalesModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredSales = salesData.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
          <DialogTitle className="font-black italic uppercase tracking-tighter text-2xl">
            Pilih Sales
          </DialogTitle>
        </DialogHeader>
        
        <div className="relative my-4">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Cari nama sales..." 
            className="pl-10 h-11"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="max-h-[300px] overflow-y-auto space-y-1 pr-2">
          {filteredSales.length > 0 ? (
            filteredSales.map((sales) => (
              <button
                key={sales.id}
                onClick={() => {
                  onSelect(sales.name);
                  setIsOpen(false);
                  setSearch(""); 
                }}
                className="w-full text-left p-3 rounded-lg hover:bg-slate-100 font-bold text-slate-700 transition-colors flex justify-between items-center group"
              >
                {sales.name}
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 text-primary transition-all" />
              </button>
            ))
          ) : (
            <p className="text-center text-slate-400 py-4 text-sm italic">Sales tidak ditemukan</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SalesModal;