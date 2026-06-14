import { useEffect, useState } from 'react'

function App() {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {

    fetch("/api/products")
      .then((response) => {

        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }

        return response.json()
      })
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })

  }, [])

  if (loading) {
    return <h2>Loading Products...</h2>
  }

  if (error) {
    return <h2>Error: {error}</h2>
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Docker 3-Tier Application</h1>

      <h2>Products from MySQL</h2>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            ID: {product.id} | Name: {product.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App