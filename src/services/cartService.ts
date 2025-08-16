import { axiosClient } from './apiClient';
import { ApiResponse, Cart, CartItem } from '../types';

export interface AddToCartRequest {
  variantId: number;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

export const cartService = {
  async getCart() {
    return axiosClient.post('/cart');
  },

  async addToCart(item: AddToCartRequest){
    return axiosClient.post<ApiResponse<CartItem>>('/cart/add', item);
  },

  async updateCartItem(itemId: number, update: UpdateCartItemRequest){
    return axiosClient.put<ApiResponse<CartItem>>(`/cart/items/${itemId}`, update);
  },

  async removeFromCart(itemId: number){
    return axiosClient.delete<ApiResponse<void>>(`/cart/items/${itemId}`);
  },

  async clearCart(){
    return axiosClient.delete<ApiResponse<void>>('/cart');
  }
};