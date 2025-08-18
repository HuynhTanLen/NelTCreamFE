import { axiosClient } from './apiClient';
import { ApiResponse, Seller, PageResponse } from '../types';

export interface SellerStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  monthlyGrowth: number;
}



export const sellerService = {
  // Đăng ký Seller mới
  registerSeller: async (data: any) => {
    const res = await axiosClient.post("/seller", data);
    return res.data;
  },

  // Lấy danh sách Seller chưa active
  getAllNonActiveSellers: async (page: number = 1, size: number = 10) => {
    const res = await axiosClient.get<ApiResponse<PageResponse<Seller>>>(`/seller/nonActive?page=${page}&size=${size}`);
    return res.data ;
  },

  // Lấy danh sách Seller đã active
  getAllActiveSellers: async (page: number = 1, size: number = 10) => {
    const res = await axiosClient.get<ApiResponse<PageResponse<Seller>>>(`/seller/active?page=${page}&size=${size}`);
    return res.data;
  },

  // Duyệt Seller (activeSeller)
  approveSeller: async (sellerId: number, payload: { approved: boolean }) => {
    const res = await axiosClient.patch(`/seller/${sellerId}`, payload);
    return res.data;
  },

  // Cập nhật thông tin Seller
  updateProfile: async (sellerId: number, data: any) => {
    const res = await axiosClient.patch(`/seller/${sellerId}/updateProfile`, data);
    return res.data as Seller;
  },
};