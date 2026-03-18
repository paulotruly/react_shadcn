import { useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"
import { useAuth } from "./context/AuthContext"

function Dashboard() {

  const { logout } = useAuth()
  const navigate = useNavigate()
  const token = localStorage.getItem("accessToken")

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
    localStorage.removeItem("accessToken")
    navigate({ to: "/login" })
  }

  return (
    <>
        <button onClick={handleLogout}> Logout </button>
    </>
  )
}

export default Dashboard
