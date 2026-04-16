import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { ArrowLeft, CreditCard, Banknote, QrCode } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const PaymentPage = ({ cart, onBack, onConfirm }: any) => {
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [isCashModalOpen, setIsCashModalOpen] = useState(false);
  const [cashAmount, setCashAmount] = useState<number>(0);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setCashAmount(Number(value));
  };
  const handleNumpadClick = (value: string | number) => {
    if (typeof value === 'number' || !isNaN(Number(value))) {
      setCashAmount(prev => {
        const combined = `${prev}${value}`;
        return Number(combined);
      });
    };
  };
  const addQuickCash = (amount: number) => {
    setCashAmount(prev => prev + amount);
  };

  const subtotal = cart.reduce((acc: number, item: any) => acc + (item.sell_price * item.quantity), 0);

  const formatIDR = (val: number) => 
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);

  return (
<div className="flex gap-8 h-[calc(100vh-140px)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
   {/* === Orders Details === */}
   <div className="flex-[1.5] flex flex-col min-h-0 bg-white border rounded-2xl p-8 shadow-sm">
      <button 
         onClick={onBack} 
         className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors mb-6 text-sm font-bold"
         >
         <ArrowLeft size={16} />
         Kembali ke katalog
      </button>
      <div className="flex justify-between items-end mb-8">
         <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tighter">Order ID #1401</h2>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">Belanja di Toko</p>
         </div>
      </div>
      <div className="flex-1 overflow-y-auto pr-4 space-y-6">
         {cart.map((item: any) => (
         <div key={item.id} className="flex justify-between items-center group">
            <div className="flex gap-4 items-center">
               <div className="h-10 w-10 rounded-lg bg-slate-50 flex items-center justify-center text-xs font-black text-slate-400 border italic">
                  {item.quantity}x
               </div>
               <div>
                  <h4 className="font-bold text-slate-700 leading-tight uppercase text-sm tracking-tight">{item.name}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">{formatIDR(item.sell_price)} / unit</p>
               </div>
            </div>
            <span className="font-black text-slate-800 tracking-tighter italic">{formatIDR(item.sell_price * item.quantity)}</span>
         </div>
         ))}
      </div>
      <div className="mt-8 pt-8 border-t border-dashed space-y-3">
         <div className="flex justify-between text-slate-400 font-bold text-xs uppercase tracking-widest">
            <span>Subtotal</span>
            <span>{formatIDR(subtotal)}</span>
         </div>
         <div className="flex justify-between items-center pt-2">
            <span className="font-black text-slate-800 text-sm uppercase tracking-tighter italic">Grand Total</span>
            <span className="text-3xl font-black text-slate-900 tracking-tighter">{formatIDR(subtotal)}</span>
         </div>
      </div>
   </div>
   {/* === Payment Details and Method === */}
   <aside className="flex-1 flex flex-col gap-6">
      <Card className="p-8 shadow-xl border-2 border-slate-100 flex-1 flex flex-col overflow-hidden">
         <h3 className="font-black text-slate-800 uppercase tracking-tight text-lg mb-8">Detail Pembayaran</h3>
         <div className="space-y-8 flex-1 overflow-y-auto pr-2">
            <section>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Metode Pembayaran</p>
               {/* Pay using Cash */}
               <div className="space-y-3 mb-6">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tunai</label>
                  <button 
                     onClick={() =>
                     {
                     setPaymentMethod('TUNAI');
                     setIsCashModalOpen(true);
                     setCashAmount(0);
                     }}
                     className={`w-full p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
                     paymentMethod === 'TUNAI' ? 'border-primary bg-primary/5 text-primary shadow-lg shadow-primary/10' : 'border-slate-100 text-slate-400 hover:border-slate-200'
                     }`}
                     >
                     <Banknote size={18} />
                     <span className="font-black text-xs uppercase italic tracking-widest">TUNAI</span>
                  </button>
                  {/* Numpad */}
                  <Dialog open={isCashModalOpen} onOpenChange={setIsCashModalOpen}>
                     <DialogContent className="sm:max-w-[450px] p-6">
                        <DialogHeader>
                           <DialogTitle className="text-2xl font-black italic tracking-tighter">Metode Tunai</DialogTitle>
                           <p className="text-sm text-slate-500">Masukkan nominal sesuai uang yang diberikan oleh member</p>
                        </DialogHeader>
                        <div className="space-y-6 mt-4">
                           {/* Display Nominal */}
                           <div className="relative group">
                              <Input 
                              type="text" 
                              inputMode="numeric" 
                              className="h-20 text-right text-4xl font-black text-primary pr-16 border-2 border-slate-900 focus-visible:ring-primary focus-visible:ring-2 transition-all shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
                              value={cashAmount === 0 ? "" : cashAmount.toLocaleString('id-ID')}
                              onChange={handleInputChange}
                              placeholder="0"
                              autoFocus 
                              />
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-end">
                                 <span className="bg-primary text-white px-2 py-0.5 rounded font-black text-[10px] tracking-tighter">
                                 IDR
                                 </span>
                              </div>
                           </div>
                           {/* Numpad Grid */}
                           <div className="grid grid-cols-4 gap-2">
                              {/* Tombol Angka 1-9 */}
                              {[1, 2, 3].map(n => <Button key={n} variant="secondary" className="h-12 font-bold text-lg" onClick={() => handleNumpadClick(n)}>{n}</Button>)}
                              <Button variant="secondary" className="h-12 font-bold bg-slate-100 text-slate-700" onClick={() => addQuickCash(10000)}>10.000</Button>
                              {[4, 5, 6].map(n => <Button key={n} variant="secondary" className="h-12 font-bold text-lg" onClick={() => handleNumpadClick(n)}>{n}</Button>)}
                              <Button variant="secondary" className="h-12 font-bold bg-slate-100 text-slate-700" onClick={() => addQuickCash(20000)}>20.000</Button>
                              {[7, 8, 9].map(n => <Button key={n} variant="secondary" className="h-12 font-bold text-lg" onClick={() => handleNumpadClick(n)}>{n}</Button>)}
                              <Button variant="secondary" className="h-12 font-bold bg-slate-100 text-slate-700" onClick={() => addQuickCash(50000)}>50.000</Button>
                              <Button variant="secondary" className="h-12 font-bold text-lg" onClick={() => handleNumpadClick(0)}>0</Button>
                              <Button variant="secondary" className="h-12 font-bold text-lg" onClick={() => handleNumpadClick('00')}>00</Button>
                              <Button variant="secondary" className="h-12 font-bold text-lg" onClick={() => handleNumpadClick('000')}>000</Button>
                              <Button variant="secondary" className="h-12 font-bold bg-slate-100 text-slate-700" onClick={() => addQuickCash(100000)}>100.000</Button>
                           </div>
                           <div className="flex gap-2 pt-4">
                              <Button 
                                 variant="secondary" 
                                 className="flex-1 h-14 font-black uppercase italic italic tracking-tighter"
                                 onClick={() => setCashAmount(subtotal)} 
                              >
                              Uang Pas
                              </Button>
                              <Button 
                                 variant="secondary" 
                                 className="flex-1 h-14 font-black uppercase italic italic tracking-tighter"
                                 onClick={() => setIsCashModalOpen(false)}
                              >
                              Kembali
                              </Button>
                              <Button 
                                 className="flex-[1.5] h-14 bg-primary font-black uppercase italic italic tracking-tighter text-lg"
                                 onClick={() => {
                              setIsCashModalOpen(false);
                              }}
                              >
                              Konfirm
                              </Button>
                           </div>
                        </div>
                     </DialogContent>
                  </Dialog>
               </div>
               {/* Payment using Debit */}
               <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Debit / QRIS</label>
                  <div className="grid grid-cols-2 gap-3">
                     {[
                     { id: 'BCA', icon: 
                     <CreditCard size={18} />
                     },
                     { id: 'NON BCA', icon: 
                     <CreditCard size={18} />
                     },
                     { id: 'QRIS', icon: 
                     <QrCode size={18} />
                     }
                     ].map((method) => (
                     <button 
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                     className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                     paymentMethod === method.id ? 'border-primary bg-primary/5 text-primary shadow-lg shadow-primary/10' : 'border-slate-100 text-slate-400 hover:border-slate-200'
                     }`}
                     >
                     {method.icon}
                     <span className="font-black text-[10px] uppercase italic tracking-widest">{method.id}</span>
                     </button>
                     ))}
                  </div>
               </div>
            </section>
         </div>
         <Button 
            disabled={!paymentMethod}
            onClick={() => onConfirm(paymentMethod)}
         className="w-full h-16 mt-8 text-lg font-black uppercase tracking-tighter italic rounded-2xl shadow-xl shadow-primary/20"
         >
         Konfirmasi Pembayaran
         </Button>
      </Card>
   </aside>
</div>
  );
};

export default PaymentPage;