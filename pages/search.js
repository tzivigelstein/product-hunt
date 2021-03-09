import { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useRouter } from 'next/router'
import useOrder from '../Hooks/useOrder'
import ProductDetails from '../components/Layout/ProductDetails'

const SearchPage = () => {
  const router = useRouter()
  const [search, setSearch] = useState([])

  const {
    query: { q },
  } = router

  const { products } = useOrder('date')

  useEffect(() => {
    const search = q.toLowerCase()
    const filtered = products.filter(product => {
      return (
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search) ||
        product.company.toLowerCase().includes(search)
      )
    })
    setSearch(filtered)
  }, [q, products])

  return (
    <Layout>
      <div className="listado-productos">
        <div className="contenedor">
          <h3>Resultados por: {q}</h3>
          <div className="bg-white">
            {search.map(filt => (
              <ProductDetails key={filt.id} product={filt} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SearchPage
