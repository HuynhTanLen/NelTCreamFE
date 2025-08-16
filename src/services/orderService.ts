import { axiosClient } from './apiClient';
import { ApiResponse, Order, OrderStatus } from '../types';

export interface CreateOrderRequest {
  addressId: number;
  items: { variantId: number; quantity: number }[];
}

export interface UpdateOrderStatusRequest {
  status: OrderStatus;
  trackingNumber?: string;
}

export const orderService = {
  async createOrder(orderData: CreateOrderRequest) {
    return axiosClient.post<ApiResponse<Order>>('/orders', orderData);
  },

  async getUserOrders() {
    return axiosClient.get<ApiResponse<Order[]>>('/orders');
  },

  async getOrder(orderId: number){
    return axiosClient.get<ApiResponse<Order>>(`/orders/${orderId}`);
  },

  async getSellerOrders() {
    return axiosClient.get<ApiResponse<Order[]>>('/seller/orders');
  },

  async updateOrderStatus(orderId: number, update: UpdateOrderStatusRequest) {
    return axiosClient.put<ApiResponse<Order>>(`/seller/orders/${orderId}/status`, update);
  },

  async cancelOrder(orderId: number){
    return axiosClient.put<ApiResponse<Order>>(`/orders/${orderId}/cancel`);
  }
};