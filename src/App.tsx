import POSPage from "./pages/POS"
import InvoicePage from "./pages/invoice"
import Sidebar from "./components/ui/sidebar"
import { useState } from "react"
import RekapPage from "./pages/rekap"
import StokPage from "./pages/product-stock"
import PaymentPage from "./pages/payment"
import RefundPage from "./pages/refund-page"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import type { TCartItem } from "./pages/POS"

function App() {
  // const [currentPage, setCurrentPage] = useState('pos');
  // const [cartData, setCartData] = useState<TCartItem[]>([]);

  // const handleGoToPayment = (items: TCartItem[]) => {
  //   setCartData(items);
  //   setCurrentPage('payment')
  // }

  return (
    <Router>
      <div className="flex h-screen bg-slate-50 overflow-hidden">
        {/* Sidebar tetap di luar Routes agar selalu muncul */}
        <Sidebar /> 

        <main className="flex-1 flex flex-col p-6 overflow-hidden">
          <Routes>
            {/* Halaman Utama (POS) */}
            <Route path="/" element={<Navigate to="/pos" />} />
            <Route path="/pos" element={<POSPage />} />
            
            {/* Halaman Payment */}
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/invoice" element={<InvoicePage />} />
            
            {/* Halaman Refund (Baru) */}
            <Route path="/refund" element={<RefundPage />} />
            
            {/* Halaman lainnya */}
            <Route path="/stok" element={<StokPage />} />
            <Route path="/rekap" element={<RekapPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App;