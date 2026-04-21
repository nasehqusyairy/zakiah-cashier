import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CreditCard, QrCode } from "lucide-react";
import type { TCartItem } from './POS';
import { useNavigate } from 'react-router-dom';
import CashPaymentModal from '@/components/ui/numpad-modal';

const PaymentPage: React.FC = () => {
   const navigate = useNavigate();
   const [cart, setCart] = useState<TCartItem[]>([]);

   useEffect(() => {
      const savedCart = localStorage.getItem("pos_cart");
      if (savedCart) {
         setCart(JSON.parse(savedCart))
      } else {
         navigate('/pos');
      }
   }, [navigate]);

   const handleConfirm = () => {
      if (paymentMethod) {
         console.log("Proses bayar dengan:", paymentMethod);
         // LOGIC: SENDING TO API (WIP)
         localStorage.removeItem("pos_cart");
      }
   };

   const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
   const [finalCash, setFinalCash] = useState<number>(0);

   const handleCashConfirm = (amount: number) => {
      setPaymentMethod('TUNAI');
      setFinalCash(amount);
   }

  const subtotal = cart.reduce((acc: number, item: any) => acc + (item.sell_price * item.quantity), 0);

  const formatIDR = (val: number) => 
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);

  return (
<div className="flex gap-8 h-[calc(100vh-140px)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
   {/* === Orders Details === */}
   <div className="flex-[1.5] flex flex-col min-h-0 bg-white border rounded-2xl p-8 shadow-sm">
      <button 
         onClick={() =>
         navigate('/pos')} 
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
               <CashPaymentModal subtotal={subtotal} isActive={paymentMethod === 'TUNAI'} onConfirm={handleCashConfirm} />
               {/* Tampilkan kembalian jika pembayaran tunai sudah diisi */}
               {paymentMethod === 'TUNAI' && finalCash > subtotal && (
               <div className="p-4 bg-green-50 border border-green-200 rounded-xl mb-6">
                  <p className="text-xs text-green-600 font-bold uppercase">Kembalian</p>
                  <p className="text-2xl font-black text-green-700">
                     {(finalCash - subtotal).toLocaleString('id-ID')}
                  </p>
               </div>
               )}
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
            onClick={handleConfirm}
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