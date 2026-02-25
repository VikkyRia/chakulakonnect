import { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./RecommendedProducts.css";

function RecommendedProducts() {
  const scrollRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  // 🔥 Read from URL
  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  const search = params.get("search");

  // 🔥 Reset to page 1 when category or search changes
  useEffect(() => {
    setPage(1);
  }, [category, search]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        setError(null);

        const queryParams = new URLSearchParams();

        if (category) queryParams.append("category", category);
        if (search) queryParams.append("search", search);
        queryParams.append("page", page);
        queryParams.append("limit", 20);

        console.log("Fetching with:", queryParams.toString());

        const response = await fetch(
          `https://chakulakonnect-backend.onrender.com/api/foods?${queryParams.toString()}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch foods");
        }

        const data = await response.json();

        setProducts(data.data.foods);
        setPagination(data.data.pagination);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, [category, search, page]);

  if (loading) return <p className="p-6">Loading products...</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error}</p>;

  return (
    <div className="recommended">
      <div className="recommended-header">
        <h3>
          {category
            ? category
            : search
            ? `Search results for "${search}"`
            : "All Foods"}
        </h3>
      </div>

      {products.length === 0 && (
        <div className="empty-state">
          <h3>No products found</h3>
          <button onClick={() => navigate("/consumer-dashboard")}>
            Go back to home
          </button>
        </div>
      )}

      <div className="product-scroll" ref={scrollRef}>
        {products.map((product) => (
          <div
            className="product-card"
            key={product.id}
            onClick={() => navigate(`/foods/${product.id}`)}
            style={{ cursor: "pointer" }}
          >
            <div className="product-image">
              {product.images?.length > 0 && (
                <img src={product.images[0]} alt={product.name} />
              )}
            </div>

            <div className="product-body">
              <div className="title-row">
                <h4>{product.name}</h4>
                <span className="home-price">₦{product.price}</span>
              </div>

              <p className="vendor">{product.seller?.fullName}</p>

              <button
                className="home-add-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
              >
                add to cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 Pagination */}
      {pagination?.pages > 1 && (
        <div className="pagination">
          {Array.from({ length: pagination.pages }, (_, i) => (
            <button
              key={i}
              className={page === i + 1 ? "active-page" : ""}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecommendedProducts;