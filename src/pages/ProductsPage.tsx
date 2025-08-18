import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List } from 'lucide-react';
import { Product, Category, ApiResponse } from '../types';
import { productService, getCategories, GetAllProductsMyCategory } from '../services/productService';
import { cartService } from '../services/cartService';
import { useAuth } from '../context/AuthContext';
import ProductGrid from '../components/Products/ProductGrid';
import { get } from 'axios';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [getProducts, setGetProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
    minPrice: '',
    maxPrice: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const { state } = useAuth();

  const pageSize = 12;

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filters, currentPage]);

  
const fetchCategories = async (): Promise<void> => {
  try {
    setIsLoadingCategories(true);
    setCategoriesError(null);

    const response: ApiResponse<Category[]> = await getCategories();

    if (response.code === 1000) {
      setCategories(response.result);
    } else {
      setCategoriesError('Failed to load categories');
    }
  } catch (error) {
    console.error('Categories fetch error:', error);
    setCategoriesError('An error occurred while fetching categories');
  } finally {
    setIsLoadingCategories(false);
  }
};


  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params: any = {
        page: currentPage,
        size: pageSize,
      };

      if (filters.category) params.category = parseInt(filters.category);
      if (filters.search) params.search = filters.search;
      if (filters.minPrice) params.minPrice = parseFloat(filters.minPrice);
      if (filters.maxPrice) params.maxPrice = parseFloat(filters.maxPrice);

      const response : any = await productService.getProducts(params);
      console.log('Products  response:', response);
      if (response.code ===1000) {
        setProducts(response?.result?.data!);
        setTotalProducts(response.result.totalElements);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };
  console.log('Products:', products);

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    setCurrentPage(0);

    // Update URL params
    const newSearchParams = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) newSearchParams.set(k, v);
    });
    setSearchParams(newSearchParams);
  };

  const handleAddToCart = async (variantId: number) => {
    if (!state.isAuthenticated) {
      return;
    }

    try {
      await cartService.addToCart({ variantId, quantity: 1 });
      // Show success notification
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const totalPages = Math.ceil(totalProducts / pageSize);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sản phẩm</h1>
            <p className="text-gray-600">
              Tìm thấy {totalProducts} sản phẩm
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Bộ lọc</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 bg-blue-600 text-white rounded-lg">
                <Grid className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Bộ lọc</h3>
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tìm kiếm
                </label>
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  placeholder="Tên sản phẩm..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Category */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Danh mục
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Tất cả danh mục</option>
                    {categories.slice(0, 6).map((category) => (
                      <option key={category.categoryId} value={category.categoryId}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Khoảng giá
                </label>
                <div className=" space-x">
                  <input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    placeholder="Từ"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    placeholder="Đến"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setFilters({ category: '', search: '', minPrice: '', maxPrice: '' });
                  setSearchParams({});
                }}
                className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Xóa bộ lọc
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* <ProductGrid
              products={getProducts.slice(currentPage * pageSize, (currentPage + 1) * pageSize)}
              loading={loading}
              onAddToCart={handleAddToCart}
            /> */}

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-1 px-8'>
              {products && products.map((product) => (
              <>
              {<ProductGrid
                key={product.productId}
                products={[product]}
                loading={loading}
                onAddToCart={handleAddToCart}
              />}
              </>
            ))}

            </div>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <button
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Trước
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = currentPage > 2 ? currentPage - 2 + i : i;
                  if (page >= totalPages) return null;
                  
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-600 border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page + 1}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                  disabled={currentPage === totalPages - 1}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sau
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}