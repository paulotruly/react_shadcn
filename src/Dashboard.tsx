import { useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"

function Dashboard() {

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
