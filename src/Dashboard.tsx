import { useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"
import { useAuth } from "./context/AuthContext"
import { getToken, removeToken } from "./lib/cookies"

function Dashboard() {

  const { logout } = useAuth()
  const navigate = useNavigate()
  const token = getToken()

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
    <>
        <button onClick={handleLogout}> Logout </button>
    </>
  )
}

export default Dashboard
