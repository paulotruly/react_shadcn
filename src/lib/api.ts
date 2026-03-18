const BASE_URL = 'https://dummyjson.com'

export async function fetchProducts(page: number, limit: number = 9) {
    const skip = (page - 1) * limit
    const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`)

    if (!response.ok) {
        throw new Error('Failed to fetch products')
    }
    
    return response.json()
}