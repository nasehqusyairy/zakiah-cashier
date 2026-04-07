import type { TInvoice } from "@/lib/model";
import type { TProduct } from "@/lib/model";

export const invoices: TInvoice[] = [
    {
        id: 1,
        invoice_number: "INV-20260407-001",
        cashier_name: "Admin Kasir",
        total_items: 2,
        total_price: 6000,
        total_paid: 10000,
        total_return: 4000,
        created_at: "2026-04-07 10:30",
        items: [
        { 
        product: { id: 2944, name: "Pita Serut Kecil", sell_price: 1000, product_unit: { name: "PCS" } } as TProduct, 
        quantity: 1, 
        subtotal: 1000 
        },
        { 
        product: { id: 2945, name: "Jarum pentul 5K", sell_price: 5000, product_unit: { name: "PCS" } } as TProduct, 
        quantity: 1, 
        subtotal: 5000 
        },
        ]
    },
    {
        id: 2,
        invoice_number: "INV-20260407-002",
        cashier_name: "Admin Kasir",
        total_items: 2,
        total_price: 6000,
        total_paid: 10000,
        total_return: 4000,
        created_at: "2026-04-07 10:30",
        items: [
        { 
        product: { id: 2944, name: "Pita Serut Kecil", sell_price: 1000, product_unit: { name: "PCS" } } as TProduct, 
        quantity: 1, 
        subtotal: 1000 
        },
        { 
        product: { id: 2945, name: "Jarum pentul 5K", sell_price: 5000, product_unit: { name: "PCS" } } as TProduct, 
        quantity: 1, 
        subtotal: 5000 
        },
        ]
    }
]