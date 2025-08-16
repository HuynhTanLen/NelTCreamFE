import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Users, Shield, Truck } from 'lucide-react';
import { Product, Category, ApiResponse, PageResponse } from '../types';
import { getCategories, productService, getProductonTop } from '../services/productService';
import { useAuth } from '../context/AuthContext';
import ProductGrid from '../components/Products/ProductGrid';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { get } from 'axios';
import ProductCard from '../components/Products/ProductCard';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const { state } = useAuth();
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setIsLoadingCategories(true);

        const [
          productsRes,
          topProductsRes,
          categoriesRes
        ] = await Promise.all([
          productService.getProducts({ page: 0, size: 8 }),
          getProductonTop() as Promise<ApiResponse<Product[]>>,
          getCategories()
        ]);

        // Featured products
        if (productsRes.code === 1000 && productsRes.result?.content) {
          setFeaturedProducts(productsRes.result.content);
        }

        // Top products
        if (topProductsRes.code === 1000 && topProductsRes.result) {
          setProducts(topProductsRes.result);
        }

        // Categories
        if (categoriesRes.code === 1000 && categoriesRes.result) {
          setCategories(categoriesRes.result);
        }

      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
        setIsLoadingCategories(false);
      }
    };

    fetchData();
  }, []);
  
  console.log("du lieu cal api products: ", products);

  const handleAddToCart = async (variantId: number) => {
    if (!state.isAuthenticated) {
      return;
    }

  //   try {
  //     await cartService.addToCart({ variantId, quantity: 1 });
  //     // Show success notification
  //   } catch (error) {
  //     console.error('Failed to add to cart:', error);
  //   }
 };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Mua sắm thông minh
              <br />
              <span className="text-yellow-300">Giá cả hợp lý</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Khám phá hàng nghìn sản phẩm chất lượng cao với giá tốt nhất. 
              Giao hàng nhanh chóng và dịch vụ khách hàng tuyệt vời.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Mua sắm ngay
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              {/* {!state.isAuthenticated && (
                <Link
                  to="/register-seller"
                  className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Trở thành Seller
                </Link>
              )} */}
            </div>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tại sao chọn chúng tôi?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Chúng tôi cam kết mang đến trải nghiệm mua sắm tốt nhất với những ưu điểm vượt trội
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sản phẩm đa dạng</h3>
              <p className="text-gray-600">Hàng nghìn sản phẩm từ các thương hiệu uy tín</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Giao hàng nhanh</h3>
              <p className="text-gray-600">Giao hàng trong 24h tại các thành phố lớn</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Bảo hành tốt</h3>
              <p className="text-gray-600">Chính sách bảo hành và đổi trả linh hoạt</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Hỗ trợ 24/7</h3>
              <p className="text-gray-600">Đội ngũ chăm sóc khách hàng tận tình</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Danh mục sản phẩm
            </h2>
            <p className="text-lg text-gray-600">
              Tìm kiếm sản phẩm theo danh mục
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.slice(0, 6).map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="group bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition-colors">
                  <ShoppingBag className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-16 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center mb-12">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Featured Products
        </h2>
        <p className="text-lg text-gray-600">
          The most loved products
        </p>
      </div>
      <Link
        to="/products"
        className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
      >
        View all
        <ArrowRight className="ml-1 w-4 h-4" />
      </Link>
    </div>

    <ProductGrid
      products={products.slice(0, 8)}
      loading={loading}
      onAddToCart={handleAddToCart}
    />


    <Link
      to="/products"
      className="text-blue-600 hover:text-blue-700 font-medium flex items-center mt-8"
    >
      Explore products
    </Link>
  </div>
</section>
      {/* CTA Section */}
      {state.isAuthenticated ? ( <>
       <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Sẵn sàng bắt đầu mua sắm?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Tham gia cùng hàng triệu khách hàng tin tưởng lựa chọn chúng tôi
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Tạo tài khoản
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Khám phá sản phẩm
            </Link>
          </div>
        </div>
      </section>
       </>
      ):(
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Trở thành Seller ngay hôm nay!
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Đăng ký miễn phí và bắt đầu bán hàng trên nền tảng của chúng tôi
            </p>
            <Link
              to="/register-seller"
              className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Đăng ký Seller
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
