import React, { useState } from 'react';
import { Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface CashPaymentModalProps {
  subtotal: number;
  onConfirm: (amount: number) => void;
  isActive: boolean;
}

const CashPaymentModal = ({ subtotal, onConfirm, isActive }: CashPaymentModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cashAmount, setCashAmount] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setCashAmount(Number(value));
  };

  const handleNumpadClick = (value: string | number) => {
    setCashAmount(prev => {
      const combined = `${prev}${value}`;
      // Mencegah angka terlalu besar yang bisa menyebabkan crash/overflow
      return Number(combined) > 999999999 ? prev : Number(combined);
    });
  };

  const addQuickCash = (amount: number) => {
    setCashAmount(prev => prev + amount);
  };

  const handleConfirmAction = () => {
    onConfirm(cashAmount);
    setIsOpen(false);
  };

  return (
    <div className="space-y-3 mb-6">
      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Metode Pembayaran</label>
      
      {/* Trigger Button */}
      <Button 
        onClick={() => {
          setIsOpen(true);
          setCashAmount(0);
        }}
        className={`w-full h-16 rounded-xl border-2 flex items-center justify-start px-6 gap-4 transition-all ${
          isActive 
            ? 'border-primary bg-primary/5 text-primary shadow-lg shadow-primary/10' 
            : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'
        }`}
      >
        <div className={`p-2 rounded-lg ${isActive ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>
            <Banknote size={20} />
        </div>
        <span className="font-black text-sm uppercase italic tracking-widest">TUNAI</span>
      </Button>

      {/* Numpad Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[450px] p-6 gap-0">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black italic tracking-tighter uppercase">Metode Tunai</DialogTitle>
            <p className="text-sm text-slate-500">Masukkan nominal uang dari pelanggan</p>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            {/* Display Nominal */}
            <div className="relative group">
              <Input 
                type="text" 
                inputMode="numeric" 
                className="h-20 text-right text-4xl font-black text-primary pr-16 border-2 border-slate-900 focus-visible:ring-primary focus-visible:ring-2 transition-all shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] bg-white"
                value={cashAmount === 0 ? "" : cashAmount.toLocaleString('id-ID')}
                onChange={handleInputChange}
                placeholder="0"
                autoFocus 
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <span className="bg-primary text-white px-2 py-1 rounded font-black text-[10px]">IDR</span>
              </div>
            </div>

            {/* Numpad Grid */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3].map(n => (
                <Button key={n} variant="secondary" className="h-14 font-bold text-xl shadow-sm active:translate-y-0.5" onClick={() => handleNumpadClick(n)}>{n}</Button>
              ))}
              <Button variant="outline" className="h-14 font-bold bg-slate-50 text-slate-700 border-slate-200" onClick={() => addQuickCash(10000)}>10k</Button>
              
              {[4, 5, 6].map(n => (
                <Button key={n} variant="secondary" className="h-14 font-bold text-xl shadow-sm active:translate-y-0.5" onClick={() => handleNumpadClick(n)}>{n}</Button>
              ))}
              <Button variant="outline" className="h-14 font-bold bg-slate-50 text-slate-700 border-slate-200" onClick={() => addQuickCash(20000)}>20k</Button>
              
              {[7, 8, 9].map(n => (
                <Button key={n} variant="secondary" className="h-14 font-bold text-xl shadow-sm active:translate-y-0.5" onClick={() => handleNumpadClick(n)}>{n}</Button>
              ))}
              <Button variant="outline" className="h-14 font-bold bg-slate-50 text-slate-700 border-slate-200" onClick={() => addQuickCash(50000)}>50k</Button>
              
              <Button variant="secondary" className="h-14 font-bold text-xl" onClick={() => handleNumpadClick(0)}>0</Button>
              <Button variant="secondary" className="h-14 font-bold text-xl" onClick={() => handleNumpadClick('00')}>00</Button>
              <Button variant="secondary" className="h-14 font-bold text-xl" onClick={() => handleNumpadClick('000')}>000</Button>
              <Button variant="outline" className="h-14 font-bold bg-slate-50 text-slate-700 border-slate-200" onClick={() => addQuickCash(100000)}>100k</Button>
            </div>

            <div className="flex gap-2 pt-4">
              <Button 
                variant="secondary" 
                className="flex-1 h-14 font-bold uppercase tracking-tighter border-2 border-slate-200"
                onClick={() => setCashAmount(subtotal)} 
              >
                Uang Pas
              </Button>
              <Button 
                className="flex-[1.5] h-14 bg-primary hover:bg-primary/90 text-white font-black uppercase italic tracking-widest text-lg shadow-lg"
                onClick={handleConfirmAction}
              >
                Konfirmasi
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CashPaymentModal;