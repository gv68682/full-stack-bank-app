import { Routes, Route, DefaultRoute } from 'react-router-dom'

import { NavBar } from '../NavBar/navbar'
import {Home} from '../home'
import { AllData} from '../alldata'
import { Login } from '../Auth/Login'
import { Signup } from '../Auth/Signup'
import {NavLogin} from '../navlogin'
import { Withdraw } from '../withdraw'
import { Balance } from '../balance'
import { Deposit } from '../deposit'
import { Transfer } from '../transfer'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/Auth/authContext'
import jwtDecode from 'jwt-decode'

import { CreateAccount } from '../createaccount'

export const AppRoutes = () => {
  const { auth } = useContext(AuthContext)

  //console.log('Auth(user) from AppRouts', auth)
  if (auth) {
    return (
      <div className='layout'>
          <Routes>
            <Route path='/alldata' element={<AllData/>} />
            <Route path="/deposit" element={<Deposit/>} />
            <Route path="/withdraw" element={<Withdraw/>} />
            <Route path="/balance" element={<Balance/>} />
            <Route path="/transfer" element={<Transfer/>} />
            <Route path="/" element={<Home/>} />
          </Routes>
      </div>
    )
  }
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/createAccount' element={<CreateAccount />} />
      <Route path='/login' element={<NavLogin />} />
    </Routes>
  )
}
