import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Truck, Shield, RotateCcw, Plus, Minus } from 'lucide-react';
import { Product, ProductVariant } from '../types';
import { productService } from '../services/productService';
import { cartService } from '../services/cartService';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/Common/LoadingSpinner';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchProduct(parseInt(id));
    }
  }, [id]);

  const fetchProduct = async (productId: number) => {
    try {
      setLoading(true);
       await productService.getProduct(productId).then((res : any) => {
        const response = res.data;
        if (response.success) {
          setProduct(response.data);
          setSelectedVariant(response.data.variants[0]);
        } else {
          setError('Không tìm thấy sản phẩm');
        }
       });
    } catch (error) {
      console.error('Failed to fetch product:', error);
      setError('Không thể tải thông tin sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!state.isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!selectedVariant) return;

    try {
      setAddingToCart(true);
      await cartService.addToCart({
        variantId: selectedVariant.id,
        quantity
      });
      // Show success notification
      alert('Đã thêm sản phẩm vào giỏ hàng!');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      alert('Không thể thêm sản phẩm vào giỏ hàng');
    } finally {
      setAddingToCart(false);
    }
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (selectedVariant?.stock || 0)) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy sản phẩm</h2>
          <button
            onClick={() => navigate('/products')}
            className="text-blue-600 hover:text-blue-700"
          >
            Quay lại trang sản phẩm
          </button>
        </div>
      </div>
    );
  }

  const imageUrl = product.images?.[0]?.url || '/placeholder.png';
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <button onClick={() => navigate('/')} className="hover:text-blue-600">
            Trang chủ
          </button>
          <span>/</span>
          <button onClick={() => navigate('/products')} className="hover:text-blue-600">
            Sản phẩm
          </button>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
              <img
                src={imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail images would go here */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 cursor-pointer">
                  <img
                    src={imageUrl}
                    alt={`${product.name} ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-current text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">(4.8) 124 đánh giá</span>
                </div>
                <span className="text-sm text-gray-500">|</span>
                <span className="text-sm text-gray-600">Đã bán 1.2k</span>
              </div>
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {product.categoryId.name}
              </span>
            </div>

            {/* Price */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-baseline space-x-4">
                <span className="text-3xl font-bold text-red-600">
                  ${selectedVariant?.price.toFixed(2)}
                </span>
               
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                  -17%
                </span>
              </div>
            </div>

            {/* Variants */}
            {product.variants.length > 1 && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Tùy chọn sản phẩm</h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`p-3 border rounded-lg text-left ${
                        selectedVariant?.id === variant.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium">{variant.sku}</div>
                      <div className="text-sm text-gray-600">
                        {variant.productVariantAttributes.map(attr  => attr.value).join(', ')}
                      </div>
                      <div className="text-sm font-medium text-blue-600">
                        ${variant.price.toFixed(2)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Số lượng</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= (selectedVariant?.stock || 0)}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  {selectedVariant?.stock} sản phẩm có sẵn
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={addingToCart || !selectedVariant?.stock}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {addingToCart ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      <span>Thêm vào giỏ hàng</span>
                    </>
                  )}
                </button>
                <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
              
              {state.isAuthenticated && (
                <button className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700">
                  Mua ngay
                </button>
              )}
            </div>

            {/* Features */}
            <div className="border-t pt-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center space-x-3">
                  <Truck className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">Miễn phí vận chuyển cho đơn hàng trên $50</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-700">Bảo hành chính hãng 12 tháng</span>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw className="w-5 h-5 text-purple-600" />
                  <span className="text-sm text-gray-700">Đổi trả miễn phí trong 30 ngày</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-16">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Mô tả sản phẩm</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                {product.description}
              </p>
              <p className="text-gray-700 leading-relaxed">
                Sản phẩm được bán bởi <span className="font-medium text-blue-600">{product.seller.user.fullName}</span> 
                với cam kết chất lượng và dịch vụ tốt nhất.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}