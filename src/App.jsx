import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <h2>Loading Products...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
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
  );
}

export default App;