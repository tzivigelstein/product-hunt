import { useState, useEffect } from 'react'
import firebase from '../firebase/index'

function useAuth() {
  const [userauht, setUserauth] = useState(null)

  useEffect(() => {
    const unsuscribe = firebase.auth.onAuthStateChanged(user => {
      if (user) {
        setUserauth(user)
      } else {
        setUserauth(null)
      }
    })
    return () => unsuscribe()
  }, [])
  return userauht
}

export default useAuth
