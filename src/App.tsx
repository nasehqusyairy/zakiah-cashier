import { Button } from "@/components/ui/button"
import POSPage from "./pages/POS"
import InvoicePage from "./pages/invoice"
import Sidebar from "./components/ui/sidebar"
import { useState } from "react"
import RekapPage from "./pages/rekap"
import StokPage from "./pages/product-stock"
import PaymentPage from "./pages/payment"
import type { TCartItem } from "./pages/POS"

function App() {
  const [currentPage, setCurrentPage] = useState('pos');
  const [cartData, setCartData] = useState<TCartItem[]>([]);

  const handleGoToPayment = (items: TCartItem[]) => {
    setCartData(items);
    setCurrentPage('payment')
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar 
        activePage={currentPage} 
        onPageChange={setCurrentPage} 
      />

      <main className="flex-1 flex flex-col p-6 overflow-hidden">
        {currentPage === 'pos' && (<POSPage onCheckout={handleGoToPayment} />)}
        {currentPage === 'payment' && (<PaymentPage cart={cartData} onBack={() => setCurrentPage('pos')} onConfirm={(method: string) => { console.log("Bayar dengan:", method) 
          setCurrentPage('pos')}} />)}
        {currentPage === 'invoice' && <InvoicePage />}
        {currentPage === 'rekap' && <RekapPage />}
        {currentPage === 'stok' && <StokPage />}
      </main>
    </div>
  )
}

export default App;