import React from "react"
import Layout from "../components/Layout/Layout"
import ProductDetails from "../components/Layout/ProductDetails"
import useOrder from "../Hooks/useOrder"
import HomeMessage from "../components/UI/HomeMessage"

const Home = () => {
  const {products} = useOrder("date")
  return (
    <Layout>
      <HomeMessage />
      <div className="listado-productos">
        <div className="contenedor">
          <div className="bg-white">
            {products.map(product => (
              <ProductDetails key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
