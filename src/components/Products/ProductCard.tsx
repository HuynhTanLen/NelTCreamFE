import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (variantId: number) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { state } = useAuth();
  const primaryVariant = product.variants[0];
  const imageUrl =
    primaryVariant?.image?.url ||
    product.images?.[0]?.url ||
    'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=300';

  console.log('Rendering product in ProductCard:', product); // Debug log

  if (!product.name || !primaryVariant) {
    console.error('Invalid product data:', product);
    return null; // Skip rendering invalid products
  }

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart && primaryVariant) {
      onAddToCart(primaryVariant.id);
    }
  };

  return (
    <Link
      to={`/productDetail/${product.productId}`}
      className="group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center space-x-1 text-xs text-gray-500 ml-2">
            <Star className="w-3 h-3 fill-current text-yellow-400" />
            <span>4.5</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mb-2 line-clamp-2">{product.description || 'No description'}</p>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-900">
              ${primaryVariant?.price?.toFixed(2) || '0.00'}
            </span>
            <span className="text-xs text-gray-500">
              {primaryVariant?.stock > 0 ? `${primaryVariant.stock} in stock` : 'Out of stock'}
            </span>
          </div>
          {state.isAuthenticated && primaryVariant?.stock > 0 && (
            <button
              onClick={handleAddToCartClick}
              className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="mt-2 text-xs text-gray-500">
          <span className="inline-block bg-gray-100 px-2 py-1 rounded">
            {product.categoryId.name || 'Category'}
          </span>
        </div>
      </div>
    </Link>
  );
}