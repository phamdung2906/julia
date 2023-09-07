import supabase, { supabaseUrl } from './supabase'

export async function getProducts() {
    const { data, error } = await supabase
        .from('products')
        .select('*')

    if (error) {
        console.log(error)
        throw new Error("Products not be loaded")
    }

    return data
}

export async function createEditProduct(newProduct, id) {

    const hasImagePath = newProduct.image?.startsWith?.(supabaseUrl)
    const imageName = `${Math.random()}-${newProduct.image.name}`.replace("/", "")
    const imagePath = hasImagePath ? newProduct.image : `${supabaseUrl}/storage/v1/object/public/product-images/${imageName}`

    let query = supabase.from('products')
    if (!id)
        query = query.insert([{ ...newProduct, image: imagePath }])
    if (id)
        query = query.update({ ...newProduct, image: imagePath }).eq('id', id)


    const { data, error } = await query.select()
    if (error) {
        console.log(error)
        throw new Error("Products not be created")
    }
    if (hasImagePath) return data;
    const { error: storageError } = await supabase
        .storage
        .from('product-images')
        .upload(imageName, newProduct.image, {
            cacheControl: '3600',
            upsert: false
        })
    if (storageError) {
        deleteProduct(data[0].id)
        throw new Error("Image cannot be stored and product cannot created")
    }
    return data
}
export async function deleteProduct({ id, image }) {
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

    if (error) {
        console.log(error)
        throw new Error("Product could not be deleted")
    }
    const fileName = image.slice(81)
    console.log(fileName)
    const { error: storageError } = await supabase
        .storage
        .from('product-images')
        .remove([fileName])
    if (storageError) throw new Error("Cannot delete image")
    return;
}