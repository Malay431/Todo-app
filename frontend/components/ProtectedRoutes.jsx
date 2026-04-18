import {Navigate, Outlet} from 'react-router-dom'
const ProtectedRoutes = ({children})=>{
    const token = localStorage.getItem('token') 
    return token ? <Outlet/> : <Navigate to='/login'/>
}

export default ProtectedRoutes