import React, { useState, useEffect } from 'react'
import { AppContent, AppFooter, AppHeader } from '../components/index'
import ip from './../constant/ip'
import axios from 'axios'
import { Login } from '@mui/icons-material'
const DefaultLayout = () => {
  const [user, setUser] = useState(null)
  const token = localStorage.getItem('token')
  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    try {
      const response = await axios.get(ip + 'users/authinfo', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setUser(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  return (
    <div>
      {!user ? (
        <Login />
      ) : (
        <>
          <div className="wrapper d-flex flex-column min-vh-100 bg-light">
            <AppHeader userInfo={user} />
            <div className="body flex-grow-1 px-3">
              <AppContent userInfo={user} />
            </div>
            <AppFooter />
          </div>
        </>
      )}
    </div>
  )
}

export default DefaultLayout
