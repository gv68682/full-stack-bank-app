import { createContext, useState, useContext } from 'react'
import jwt from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { bankAPI } from '../../services';

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {

  const userToken = localStorage.getItem('token')
  const userInfoData = JSON.parse(localStorage.getItem('userInfo'))
  let userData = null
  if (userToken) {
    userData = jwt(userToken)
  }
  const [auth, setAuth] = useState(userData)
  const [authToken, setAuthToken] = useState(userToken)
  const [userInfo, setUserInfo] = useState(userInfoData)
  const navigate = useNavigate()

  const saveUserInfo = async(id) => {
    const response = await bankAPI.oneUser(id);
    //console.log('userdata with balance from authContext saveUser: ', response)
    if (response.status === 200) {
      setUserInfo(response.data)
      localStorage.setItem('userInfo', JSON.stringify(response.data));
    } else {
      throw new Error(`Couldn't get userinfo: ${response}`);
    }
  }

  const login = async (email, password) => {
    try {
      const userCredential = await bankAPI.login({email: email, password: password})
      if (userCredential.status !== 200) {
        return false
      }
      //console.log('Res as token from LOGIN request', userCredential)
      const user = jwt(userCredential.data); //from token, get decoded user through jwt 
      localStorage.setItem('token', userCredential.data);
      //console.log('user login from authcontext: ', auth)
      bankAPI.updateServiceAuth();
      await saveUserInfo(user.id);
      setAuth(user)
      setAuthToken(userCredential.data)
      navigate('/')
    } catch (e) {
      //console.log(e)
    }
  }

  const signup = async (name, email, password) => {
    //console.log('From authContext file', email, password)
    try {
      //const userCredential = await axios.post('auth/signup', { email, password })
      const userCredential = await bankAPI.signup({name: name, email: email, password: password})
      //console.log('Res as token from SIGNUP request', userCredential)
      if (userCredential.status !== 201) {
        return false
      }
      const user = jwt(userCredential.data);
      localStorage.setItem('token', userCredential.data);
      //console.log("stored token in local storage")
      //console.log('user signup from authcontext: ', auth)
      bankAPI.updateServiceAuth();
      await saveUserInfo(user.id);
      setAuth(user)
      //console.log('user signup from authcontext111: ', auth)
      setAuthToken(userCredential.data)
      navigate('/')
    } catch (e) {
    }
  }


  const logout = async () => {
    try {
      localStorage.clear();
      setAuth(null)
      setAuthToken(null)
    } catch (e) {
    }
  }
  return (
    <AuthContext.Provider value={{ saveUserInfo, auth, authToken, userInfo, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
