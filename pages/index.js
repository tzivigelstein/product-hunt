import { useState } from "react"

import useOrder from "@hooks/useOrder"

import Layout from "@components/Layout/Layout"
import ProductDetail from "@components/Layout/ProductDetail"
import HomeMessage from "@components/UI/HomeMessage"

export default function Home() {
  const { products, setOrder } = useOrder("date")
  const [selectedValue, setSelectedValue] = useState("")

  const handleChange = event => {
    setSelectedValue(event.target.value)
    const value = event.target.value

    const OPTIONS_MAPPING = {
      featured: "date",
      popular: "votes",
    }

    setOrder(OPTIONS_MAPPING[value])
  }

  return (
    <Layout>
      <div className="wrapper">
        <div className="container">
          <HomeMessage />
          <div className="heading_container">
            <h1 className="heading">Is the next 🦄 here?</h1>
            <select
              value={selectedValue}
              onChange={handleChange}
              defaultChecked
            >
              <option value="featured">Featured</option>
              <option value="popular">Popular</option>
            </select>
          </div>
          <ul className="product_list">
          {products.map(product => (
            <ProductDetail key={product.id} product={product} />
          ))}
          </ul>
        </div>
      </div>
    </Layout>
  )
}
