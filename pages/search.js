import { useEffect, useState } from "react"
import Layout from "../components/Layout/Layout"
import { useRouter } from "next/router"
import useOrder from "../hooks/useOrder"
import ProductDetail from "../components/Layout/ProductDetail"

const SearchPage = () => {
  const router = useRouter()
  const [searchProducts, setSearchProducts] = useState([])

  const {
    query: { q },
  } = router

  const { products } = useOrder("date")

  useEffect(() => {
    if (q) {
      const query = q.toLowerCase()
      const filteredProducts = products.filter(
        ({ name, description, company }) => {
          const fields = [name, description, company]

          for (const field of fields) {
            return field.toLowerCase().includes(query)
          }
        }
      )

      setSearchProducts(filteredProducts)
    }
  }, [q, products])

  return (
    <Layout>
      <div className="wrapper">
        <div className="container">
          <ul className="product_list">
            {searchProducts.map(searchProduct => (
              <ProductDetail key={searchProduct.id} product={searchProduct} />
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export default SearchPage
