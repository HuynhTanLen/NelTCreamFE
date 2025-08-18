import { PermissionError } from './../../node_modules/@humanfs/core/dist/errors.d';
import { Description } from './../../node_modules/jackspeak/dist/commonjs/index.d';
// API Response Types
export interface ApiResponse<T> {
  result: T;
  message: string;
  code: 1000;
}

export interface PageResponse<T> {
  data: T[];
  totalElements: number;
  totalPages: number;
  number: number; // current page
  size: number;
}


// Auth Types
export interface User {
  id: string;
  email: string;
  fullName: string;
  roles:Role[];
  createdAt: string;
  updatedAt: string;
}

export interface Seller {
  id: string;
  email: string;
  user: User;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  seller: Seller | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  token: string | null;
}

// Product Types
export interface Category {
  categoryId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface MediaFile {
  id: number;
  url: string;
  fileSize: number;
  publicId: string;
  fileType: string;
  createdAt: string;
  updatedAt: string;
}

export interface AttributeType {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariantAttribute {
  id: number;
  attributeType: AttributeType;
  value: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: number;
  sku: string;
  price: number;
  stock: number;
  productVariantAttributes: ProductVariantAttribute[];
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  productId: number;
  name: string;
  description: string;
  images?: { url: string }[]; // Used in manual grid
  variants: { id: number; price: number; stock: number; image?: { url: string } }[]; // Used in ProductCard
  categoryId: Category;
  createdAt: string;
  updatedAt: string;
}

export enum ProductStatus {
  ACTIVE = 'IN_STOCK',
  INACTIVE = 'OUT_OF_STOCK',
  DELETED = 'DISCONTINUED'
}

// Cart Types
export enum CartStatus {
  ACTIVE = 'ACTIVE',
  ABANDONED = 'ABANDONED'
}

export interface CartItem {
  id: number;
  variant: ProductVariant;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface Cart {
  id: number;
  user: User;
  items: CartItem[];
  totalAmount: number;
  itemCount: number;
  status: CartStatus;
  addedAt: string;
  updatedAt: string;
}

// Order Types
export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export interface Address {
  id: number;
  user: User;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  country: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: number;
  variant: ProductVariant;
  quantity: number;
  unitPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  orderId: number;
  user: User;
  fullName: string;
  email: string;
  totalAmount: number;
  shippingAddress: Address;
  shippingDate?: string;
  trackingNumber?: string;
  status: OrderStatus;
  orderItems: OrderItem[];
  createdAt: string;
  updatedAt: string;
}
export interface Role{
  name: string;
  description: string;
  permission: Permission[];
}
export interface Permission{
  name: string;
}