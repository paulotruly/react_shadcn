import { useQuery } from "@tanstack/react-query"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { fetchProductById } from "@/lib/api"
import { Card, CardContent, CardTitle } from "./ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ProductDetail() {
  const navigate = useNavigate()
  const search = useSearch({from: '/dashboard/product'})
  const productId = search.id

  const { 
    data: product,
    error,
    isLoading
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId as string),
    enabled: !!productId,
  })

  if (!productId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px]">
        <p>Nenhum produto selecionado</p>
        <Button onClick={() => navigate({ to: '/dashboard' })}>
          Voltar para lista
        </Button>
      </div>
    )
  }

  if (isLoading) return (
    <Card className="w-full max-w-4xl mx-auto min-h-[500px] flex items-center justify-center">
      <p>Carregando produto...</p>
    </Card>
  )

  if (error) return (
    <Card className="w-full max-w-4xl mx-auto min-h-[500px] flex flex-col items-center justify-center gap-4">
      <p>Erro ao carregar produto</p>
      <Button onClick={() => navigate({ to: '/dashboard' })}>
        Voltar para lista
      </Button>
    </Card>
  )

  return (
    <div className="flex flex-col items-center gap-6 pb-10">
      <div className="w-full max-w-4xl">
        <Button 
          variant="outline" 
          onClick={() => navigate({ to: '/dashboard' })}
        >
          ← Voltar
        </Button>
      </div>

      <Card className="w-full max-w-4xl">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="space-y-4">
              <img
                src={product.images?.[0] || product.thumbnail}
                alt={product.title}
                className="w-full rounded-lg"
              />
              
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.map((image: string, index: number) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${product.title} - ${index + 1}`}
                      className={cn(
                        "w-20 h-20 object-cover rounded cursor-pointer border-2",
                        index === 0 ? "border-primary" : "border-transparent"
                      )}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wide">
                  {product.brand} • {product.category}
                </p>
                <CardTitle className="text-3xl mt-2">{product.title}</CardTitle>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold">
                  ${product.price}
                </span>
                {product.discountPercentage > 0 && (
                  <span className="text-sm text-green-600 font-medium">
                    -{product.discountPercentage.toFixed(0)}%
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-yellow-500">⭐ {product.rating}</span>
                <span className="text-muted-foreground">
                  ({product.stock} em estoque)
                </span>
              </div>

              <p className="text-muted-foreground">
                {product.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
