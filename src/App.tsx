import { Button } from "@/components/ui/button"
import POSPage from "./pages/POS"
import InvoicePage from "./pages/invoice"
import Sidebar from "./components/ui/sidebar"
import { useState } from "react"
import RekapPage from "./pages/rekap"

function App() {
  const [currentPage, setCurrentPage] = useState('pos');

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar 
        activePage={currentPage} 
        onPageChange={setCurrentPage} 
      />

      <main className="flex-1 flex flex-col p-6 overflow-hidden">
        {currentPage === 'pos' && <POSPage />}
        {currentPage === 'invoice' && <InvoicePage />}
        {currentPage === 'rekap' && <RekapPage />}
        {currentPage === 'stok' && <div className="p-20 text-center text-slate-400">Halaman Stok </div>}
      </main>
    </div>
  )
}

export default App;