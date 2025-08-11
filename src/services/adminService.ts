import { axiosClient } from './apiClient';
import { ApiResponse, Category, Seller } from '../types';

export interface CreateCategoryRequest {
  name: string;
}

export interface ApproveSellerRequest {
  sellerId: string;
  approved: boolean;
}

export const adminService = {
  async createCategory(categoryData: CreateCategoryRequest) {
    return axiosClient.post<ApiResponse<Category>>('/categories', categoryData);
  },

  async updateCategory(id: number, categoryData: CreateCategoryRequest) {
    return axiosClient.put<ApiResponse<Category>>(`/categories/${id}`, categoryData);
  },

  async deleteCategory(id: number) {
    return axiosClient.delete<ApiResponse<void>>(`/categories/${id}`);
  },

  async getPendingSellers() {
    return axiosClient.get<ApiResponse<Seller[]>>('/api/sellers/nonActive');
  },

  async approveSeller(request: ApproveSellerRequest) {
    return axiosClient.put<ApiResponse<Seller>>(`/admin/sellers/${request.sellerId}/approve`, request);
  },

  async getAllSellers() {
    return axiosClient.get<ApiResponse<Seller[]>>('/admin/sellers');
  }
};