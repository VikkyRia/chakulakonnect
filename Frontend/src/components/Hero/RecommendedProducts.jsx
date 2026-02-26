import { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { ShoppingBag, ChevronLeft, ChevronRight, SearchX } from "lucide-react";

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

        const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://chakulakonnect-backend.onrender.com';
        const response = await fetch(
          `${baseURL}/api/foods?${queryParams.toString()}`
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

  if (loading) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center h-[400px]">
        <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-400 font-bold text-xs uppercase tracking-widest italic">Scanning Marketplace...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-10 bg-rose-50 rounded-[30px] border border-rose-100 text-center">
        <p className="text-rose-600 font-black italic">Network Connection Issue</p>
        <p className="text-rose-400 text-xs mt-2 font-medium italic">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-end mb-8">
        <h3 className="text-2xl font-black text-slate-900 tracking-tight italic">
          {category
            ? category
            : search
              ? `Search: "${search}"`
              : "Fresh Arrivals"}
        </h3>
        {products.length > 0 && pagination?.total && (
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">
            {pagination.total} products found
          </span>
        )}
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl mb-6">
            <SearchX size={32} className="text-slate-300" />
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-2 italic">No products found</h3>
          <p className="text-slate-500 font-medium italic mb-8 max-w-xs">We couldn't find matches for your request. Try adjusting your search.</p>
          <button
            onClick={() => navigate("/consumer-dashboard")}
            className="px-8 py-3 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:bg-black transition-all active:scale-95"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0" ref={scrollRef}>
            {products.map((product) => (
              <div
                className="min-w-[260px] sm:min-w-[300px] bg-white rounded-[40px] border border-slate-100 hover:border-emerald-100 p-4 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-50 flex flex-col group active:scale-[0.98] cursor-pointer snap-start"
                key={product.id}
                onClick={() => navigate(`/foods/${product.id}`)}
              >
                <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden mb-5">
                  {product.images?.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300 italic font-black text-xs uppercase">No Image</div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl text-[10px] sm:text-xs font-black text-slate-900 shadow-sm italic uppercase tracking-wider">
                      NEW
                    </span>
                  </div>
                </div>

                <div className="flex-1 flex flex-col px-1">
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <h4 className="text-lg font-black text-slate-900 tracking-tight italic truncate">{product.name}</h4>
                    <span className="text-emerald-500 font-black text-base italic shrink-0">₦{product.price}</span>
                  </div>

                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest italic mb-6">
                    {product.seller?.fullName || "Verified Seller"}
                  </p>

                  <button
                    className="mt-auto w-full py-3.5 bg-slate-50 text-slate-900 border border-slate-100 font-black rounded-2xl text-[10px] uppercase tracking-widest italic hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all flex items-center justify-center gap-2 group/btn active:scale-95"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    <ShoppingBag size={14} className="group-hover/btn:scale-110 transition-transform" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 🔥 Pagination */}
          {pagination?.pages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-10">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-90"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex gap-2">
                {Array.from({ length: Math.min(pagination.pages, 5) }, (_, i) => {
                  const pageNum = i + 1;
                  const isCurrent = page === pageNum;
                  return (
                    <button
                      key={pageNum}
                      className={`w-10 h-10 rounded-2xl font-black text-xs transition-all active:scale-90 ${isCurrent ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'bg-white border border-slate-100 text-slate-400 hover:border-slate-300'}`}
                      onClick={() => setPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                disabled={page === pagination.pages}
                onClick={() => setPage(p => p + 1)}
                className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-90"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default RecommendedProducts;
