
import { Route,Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Project from './pages/Project'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import Pagentfound from './pages/Pagentfound'
import Footer from './components/Footer'
import { useContext } from 'react'
import { loginResponseContext } from './context/ContextShare'



function App() {
  const {loginResponse}=useContext(loginResponseContext)

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/project' element={loginResponse?<Project/>:<Pagentfound/>}/>
        <Route path='/login' element={<Auth/>}/>
        <Route path='/register' element={<Auth register={true}/>}/>
        <Route path='/dashboard' element={loginResponse?<Dashboard/>:<Pagentfound/>}/>
        <Route path='*' element={<Pagentfound/>}/>
      </Routes>
     
    </>
  )
}

export default App
