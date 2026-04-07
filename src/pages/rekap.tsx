import { useState } from "react"


const RekapPage = () => {
    const [actualCash, setActualCash] = useState({
        tunai: 0,
        bca: 0,
        nonBca: 0,
        qris: 0
    });

    const SystemData = {
        tunai: 13000,
        bca: 0,
        nonBca: 0,
        qris: 0
    };

    const formatIDR = (val: number) =>
        new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);

    return (
        <div className="flex gap-6 h-[calc(100vh-140px)]">
            {/* Kolom Kiri & Kanan akan diisi di segmen berikutnya */}
        </div>
    );
};

export default RekapPage;