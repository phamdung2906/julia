import supabase from "./supabase";

export async function getOrders() {

    const { data, error } = await supabase
        .from('order_products')
        .select(`
                productID(
                    name,
                    image
                ),
                orderID (
                    orderID
                ),
                size,
                form,
                deadline,
                status
                        `)
    console.log(data)
    return data
}