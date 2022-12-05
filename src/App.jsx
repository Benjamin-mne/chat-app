//React Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Pages
import { Home } from './pages/home/Home'
import { Login } from './pages/login/Login'
import { Register } from './pages/register/Register'

//Context
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={ currentUser ? <Home/> : <Login/> }/>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
