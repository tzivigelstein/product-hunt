import { useState, useEffect, useContext } from 'react'
import { FirebaseContext } from '../firebase/index'

const useOrder = order => {
  const [products, setProducts] = useState([])
  const { firebase } = useContext(FirebaseContext)

  useEffect(() => {
    const getProducts = () => {
      firebase.db.collection('products').orderBy(order, 'desc').onSnapshot(handleSnapshot)
    }
    getProducts()
  }, [])

  function handleSnapshot(snapshot) {
    const products = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data(),
      }
    })
    setProducts(products)
  }
  return { products }
}

export default useOrder
