import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { fetchProducts } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import type { Product } from "@/types/types"

interface ProductListProps {
  page: number
  onPageChange: (page: number, event?: React.MouseEvent) => void
}

export function ProductList({ page, onPageChange }: ProductListProps) {
  // useNavigate: hook para navegar programaticamente
  // Usaremos para ir para a página de detalhes do produto
  const navigate = useNavigate()

  // useQuery: busca dados da API com cache automático
  // queryKey: identificador único para esta query
  // queryFn: função que faz a requisição
  const { data, error, isLoading } = useQuery({
    queryKey: ['products', page],
    queryFn: () => fetchProducts(page),
  })

  const limit = 9
  const totalPages = data?.total ? Math.ceil(data.total / limit) : 0

  // --------------------------------------------------------
  // ESTADO: CARREGANDO
  // --------------------------------------------------------
  // Container com min-height para manter scroll estável
  if (isLoading) return (
    <div className="flex flex-col justify-center items-center min-h-[500px]">
      <span>Carregando...</span>
    </div>
  )
  
  // --------------------------------------------------------
  // ESTADO: ERRO
  // --------------------------------------------------------
  if (error) return <>Erro ao carregar produtos</>

  // --------------------------------------------------------
  // FUNÇÃO: LIDAR COM CLIQUE NO PRODUTO
  // --------------------------------------------------------
  // Quando usuário clicar em um card, navega para detalhes
  function handleProductClick(productId: number) {
    // navigate({ to: '/dashboard/product', search: { id: String(productId) } })
    // to: destino da rota
    // search: query parameters (?id=X)
    // Resultado: /dashboard/product?id=1
    navigate({ 
      to: '/dashboard/product', 
      search: { id: String(productId) } 
    })
  }

  // --------------------------------------------------------
  // ESTADO: SUCESSO - MOSTRA LISTA DE PRODUTOS
  // --------------------------------------------------------
  return (
    <div className="flex flex-col justify-center items-center">
      {/* Grid responsivo de produtos */}
      {/* Mobile: 1 coluna | Tablet: 2 colunas | Desktop: 3 colunas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-1/2 ">
        {data?.products?.map((product: Product) => (
          // --------------------------------------------------------
          // CARD DO PRODUTO - clicável
          // --------------------------------------------------------
          // onClick: dispara navegação para página de detalhes
          // cursor-pointer: muda cursor para mãozinha
          <Card 
            key={product.id} 
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleProductClick(product.id)}
          >
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

      {/* --------------------------------------------------------
           BOTÕES DE PAGINAÇÃO
           -------------------------------------------------------- */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {/* Botão PREV - volta uma página */}
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

        {/* Botões numéricos das páginas */}
        {/* Array.from cria um array de tamanho totalPages */}
        {/* _, i) => i + 1 cria índices de 1 até totalPages */}
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

        {/* Botão NEXT - avança uma página */}
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
