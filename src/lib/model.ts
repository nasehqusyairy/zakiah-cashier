export type TProduct = {
    id: number,
    name: string,
    code: string,
    image_url: string | null,
    sku: string,
    product_category_id: number,
    product_unit_id: number,
    sell_price: number,
    barcode: string,
    product_unit: {
        id: number,
        name: string
    },
    product_category: {
        id: number,
        name: string
    },
    product_location_stock: {
        product_id: number,
        stock: number,
        average_buy_price: number
    }
}