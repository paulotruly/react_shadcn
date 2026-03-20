const BASE_URL = 'https://dummyjson.com'

export async function fetchProducts(page: number, limit: number = 9) {
    const skip = (page - 1) * limit
    const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`)

    if (!response.ok) {
        throw new Error('Failed to fetch products')
    }
    
    return response.json()
}

export async function fetchProductById(id: string) {
    const response = await fetch(`${BASE_URL}/products/${id}`)
    if (!response.ok) throw new Error('Failed to fetch product')
    return response.json()
}
