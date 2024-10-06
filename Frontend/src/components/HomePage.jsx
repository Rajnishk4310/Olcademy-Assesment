import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [products, setProducts] = useState([]); // State to hold the products
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage error status

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products"); // Adjust the API endpoint as needed
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data); // Set the fetched products in state
      } catch (err) {
        setError(err.message); // Handle error
      } finally {
        setLoading(false); // Set loading to false once the fetch is done
      }
    };

    fetchProducts(); // Call the fetch function
  }, []); // Empty dependency array means it runs once when the component mounts

  if (loading) {
    return <div className="text-center py-10">Loading...</div>; // Display loading state
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>; // Display error message if any
  }

  return (
    <div className="bg-gray-50">
      {/* Call to Action Banner */}
      <div className="bg-blue-500 text-white text-center py-10">
        <h2 className="text-4xl font-bold mb-2">Explore Our Latest Collections!</h2>
        <p className="mb-4 text-lg">
          Discover special offers on your favorite perfumes.
        </p>
        <Link
          to="/"
          className="bg-white text-blue-500 font-semibold px-6 py-2 rounded hover:bg-blue-100 transition duration-300"
        >
          Shop Now
        </Link>
      </div>

      {/* Products Section */}
      <div className="container mx-auto my-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-6">Our Perfumes</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id}>
              <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 rounded-lg h-full group">
                <img
                  src={product.images[0]} // Assuming images is an array
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4 transition-transform duration-300 group-hover:scale-105"
                />
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-700 mb-2 line-clamp-2 overflow-hidden">
                  {product.description}
                </p>
                <p className="text-lg font-bold text-gray-900">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
