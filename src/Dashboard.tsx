import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

function Dashboard() {

  const navigate = useNavigate()
  const token = localStorage.getItem("accessToken")

  useEffect(() => {
      if (!token) {
        navigate("/login", { replace: true })
      }
    }, [token, navigate])
  
    if (!token) {
      return null
    }

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    navigate("/login")
  }

  return (
    <>
        <button onClick={handleLogout}> Logout </button>
    </>
  )
}

export default Dashboard
