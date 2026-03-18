import { useQuery } from "@tanstack/react-query"
import { fetchProducts } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import type { Product } from "@/types/types"

interface ProductListProps {
  page: number
  onPageChange: (page: number, event?: React.MouseEvent) => void
}

export function ProductList({ page, onPageChange }: ProductListProps) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['products', page],
    queryFn: () => fetchProducts(page),
  })

  const limit = 9
  const totalPages = data?.total ? Math.ceil(data.total / limit) : 0

  if (isLoading) return <>Carregando...</>
  if (error) return <>Erro ao carregar produtos</>

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-1/2 ">
        {data?.products?.map((product: Product) => (
          <Card key={product.id} className="overflow-hidden">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-70 object-cover"
            />
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span className="text-lg">{product.title}</span>
                <span className="text-primary font-bold">${product.price}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {product.description}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm">⭐ {product.rating}</span>
                <span className="text-sm text-muted-foreground">
                  • {product.stock} em estoque
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-6">
        <button
          disabled={page === 1}
          onClick={(e) => {
            e.preventDefault()
            onPageChange(page - 1)
          }}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          ← PREV
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            className={`px-3 py-1 border rounded ${
              page === num ? 'bg-primary text-white' : ''
            }`}
            onClick={(e) => {
              e.preventDefault()
              onPageChange(num)
            }}
          >
            {num}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={(e) => {
            e.preventDefault()
            onPageChange(page + 1)
          }}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          NEXT →
        </button>
      </div>
    </div>
  )
}
