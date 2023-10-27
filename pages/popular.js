import React from "react"
import Layout from "../components/Layout/Layout"
import ProductDetails from "../components/Layout/ProductDetails"
import useOrder from "../hooks/useOrder"

const Popular = () => {
  const { products } = useOrder("votes")
  return (
    <Layout>
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

export default Popular
