import { useState, useEffect, useContext } from "react"
import { FirebaseContext } from "../firebase/index"

const useOrder = order => {
  const [currentOrder, setCurrentOrder] = useState(order)
  const [products, setProducts] = useState([])
  const { firebase } = useContext(FirebaseContext)

  useEffect(() => {
    const getProducts = () => {
      firebase.db
        .collection("products")
        .orderBy(currentOrder, "desc")
        .onSnapshot(handleSnapshot)
    }
    getProducts()

    console.log("executing")
  }, [currentOrder])

  function handleSnapshot(snapshot) {
    const products = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data(),
      }
    })
    setProducts(products)
  }

  return { products, setOrder: setCurrentOrder }
}

export default useOrder
