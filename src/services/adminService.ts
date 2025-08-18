import axiosClient from './apiClient';
import { ApiResponse, Category, Seller, PageResponse } from '../types';

export interface CreateCategoryRequest {
  name: string;
}

export interface ApproveSellerRequest {
  sellerId: number;
  approved: boolean;
}

export const adminService = {
  // -------- CATEGORY --------
  async createCategory(categoryData: CreateCategoryRequest) {
    return axiosClient.post<ApiResponse<Category>>('/categories', categoryData);
  },

  async getCategories() {
    return axiosClient.get<ApiResponse<Category[]>>('/categories/getAll');
  },

  async updateCategory(categoryId: number, categoryData: CreateCategoryRequest) {
    return axiosClient.put<ApiResponse<Category>>(`/categories/${categoryId}`, categoryData);
  },

  async deleteCategory(categoryId: number) {
    return axiosClient.delete<ApiResponse<null>>(`/categories/${categoryId}`);
  },

  // -------- SELLER --------
  async getPendingSellers(page = 1, size = 10) {
    return axiosClient.get<ApiResponse<PageResponse<Seller>>>(`/seller/nonActive?page=${page}&size=${size}`);
  },

  async getActiveSellers(page = 1, size = 10) {
    return axiosClient.get<ApiResponse<PageResponse<Seller>>>(`/seller/active?page=${page}&size=${size}`);
  },

  async approveSeller(request: ApproveSellerRequest) {
    return axiosClient.patch<ApiResponse<Seller>>(
      `/api/seller/${request.sellerId}/approve`,
      { approved: request.approved }
    );
  },

  async updateSellerProfile(sellerId: number, data: Partial<Seller>) {
    return axiosClient.patch<ApiResponse<Seller>>(`/api/seller/${sellerId}/updateProfile`, data);
  },
};
