import { axiosClient } from './apiClient';
import { Category, ProductVariant, Seller, Product, ApiResponse, PageResponse } from '../types';
import axios from 'axios';



// export const createProductRequest = async (
//   productId: number,
//   name: string,
//   description: string,
//   seller: Seller,
//   category: Category,
//   variants: ProductVariant[],
//   createdAt: string,
//   updatedAt: string
// ) => {
//   const productData = {
//     productId,
//     name,
//     description,
//     seller,
//     category,
//     variants,
//     createdAt,
//     updatedAt,
//   };
//   return await axiosClient.post('/products', productData);
// };

// export const getAllProducts = async () => {
//   return await axiosClient.get<Product[]>('/products');
// };

export const productService = {
  async getProducts(params: { categoryId?: number; page?: number; size?: number } = {}): Promise<ApiResponse<PageResponse<Product>>> {
    const res = await axiosClient.get<ApiResponse<PageResponse<Product>>>('/products/getAll', {
      params: {
        categoryId: params.categoryId,
        page: params.page || 1,
        size: params.size || 10,
      },
    });
    return res.data;
  },


  async getProduct(id: number): Promise<Product> {
    const res = await axiosClient.get<Product>(`/products/${id}`);
    return res.data;
  }
};

export const getProductonTop = async (): Promise<ApiResponse<Product[]>> => {
  const res = await axiosClient.get<ApiResponse<Product[]>>('/products/featured');
  return res.data;
};

// cal del cho nằm vào function
 export const getCategories = async ():Promise<ApiResponse<Category[]>>=> {
  const response = await axiosClient.get<ApiResponse<Category[]>>('/categories/getAll');
  return response.data;
 }

// Giả sử categoryId là số
export const GetAllProductsMyCategory = async (params: {
  categoryId?: number;
  page: number;
  size: number;
}): Promise<ApiResponse<PageResponse<Product>>> => {
  const queryParams = new URLSearchParams({
    ...(params.categoryId !== undefined && { id: params.categoryId.toString() }),
    page: params.page.toString(),
    size: params.size.toString(),
  });

  const res = await fetch(`/identity/api/products/getAllByCategory?${queryParams}`);
  return res.json();
};






  // async createProduct(productData: Omit<Product, 'productId' | 'createdAt' | 'updatedAt'>): Promise<Product> {
  //   return axiosClient.post<Product>('/products', productData);
  // },

  // async updateProduct(id: number, productData: Partial<CreateProductRequest>): Promise<ApiResponse<Product>> {
  //   return apiClient.put<ApiResponse<Product>>(`/products/${id}`, productData);
  // },

  // async deleteProduct(id: number): Promise<ApiResponse<void>> {
  //   return apiClient.delete<ApiResponse<void>>(`/products/${id}`);
  // },

  // async getSellerProducts(): Promise<ApiResponse<Product[]>> {
  //   return apiClient.get<ApiResponse<Product[]>>('/seller/products');
  // },

  // async getCategories(){
  //   return axiosClient.get('/categories').then(res => res.data);
  // }