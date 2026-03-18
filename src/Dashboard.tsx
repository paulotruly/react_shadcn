import { useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { useAuth } from "./context/AuthContext"
import { getToken, removeToken } from "./lib/cookies"
import { ProductList } from "./components/product-list"

function Dashboard() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const token = getToken()

  const [page, setPage] = useState(1)

  useEffect(() => {
    if (!token) {
      navigate({ to: "/login", replace: true })
    }
  }, [token, navigate])

  if (!token) {
    return null
  }

  const handleLogout = () => {
    logout()
    removeToken()
    navigate({ to: "/login" })
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <button onClick={handleLogout}>Logout</button>
      </div>

      <ProductList
        page={page}
        onPageChange={setPage}
      />
    </div>
  )
}

export default Dashboard
