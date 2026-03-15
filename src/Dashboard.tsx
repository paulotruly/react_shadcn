import { useNavigate } from "react-router-dom"

function Dashboard() {

  const navigate = useNavigate()

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
