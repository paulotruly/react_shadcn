import { Route, Routes } from "react-router-dom"
import Login from "./Login"
import Home from "./Home"
import Dashboard from "./Dashboard"

function App() {
  return (
    <>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
    </>
  )
}

export default App
