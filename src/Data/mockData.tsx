import { Product, Category, User, Seller, Order, Cart, ProductStatus } from '../types';

// Mock Categories
export const mockCategories: Category[] = [
  {
    id: 1,
    name: 'Điện thoại & Máy tính bảng',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Laptop & Máy tính',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 3,
    name: 'Thời trang Nam',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 4,
    name: 'Thời trang Nữ',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 5,
    name: 'Gia dụng & Đời sống',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 6,
    name: 'Sách & Văn phòng phẩm',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'admin@example.com',
    fullName: 'Admin User',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'user-2',
    email: 'seller@example.com',
    fullName: 'Seller User',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

// Mock Sellers
export const mockSellers: Seller[] = [
  {
    id: 'user-2',
    email: 'seller@example.com',
    user: mockUsers[1],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

// Mock Products
export const mockProducts: Product[] = [
  {
    productId: 1,
    name: 'iPhone 15 Pro Max',
    description: 'iPhone 15 Pro Max với chip A17 Pro mạnh mẽ, camera 48MP và màn hình Super Retina XDR 6.7 inch',
    seller: mockSellers[0],
    status : ProductStatus.ACTIVE,
    category: mockCategories[0],
    variants: [
      {
        id: 1,
        sku: 'IP15PM-256-NT',
        price: 1299.99,
        stock: 50,
        image: {
          id: 1,
          url: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=500',
          fileSize: 1024000,
          publicId: 'iphone-15-pro-max',
          fileType: 'image/jpeg',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        },
        productVariantAttributes: [
          {
            id: 1,
            attributeType: { id: 1, name: 'Màu sắc', createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
            value: 'Natural Titanium',
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z'
          },
          {
            id: 2,
            attributeType: { id: 2, name: 'Dung lượng', createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
            value: '256GB',
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z'
          }
        ],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    productId: 2,
    name: 'MacBook Pro 16 inch M3',
    description: 'MacBook Pro 16 inch với chip M3 Pro, RAM 18GB và SSD 512GB. Hiệu năng vượt trội cho công việc chuyên nghiệp',
    seller: mockSellers[0],
    status : ProductStatus.ACTIVE,
    category: mockCategories[1],
    variants: [
      {
        id: 2,
        sku: 'MBP16-M3-512',
        price: 2499.99,
        stock: 25,
        image: {
          id: 2,
          url: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=500',
          fileSize: 1024000,
          publicId: 'macbook-pro-16',
          fileType: 'image/jpeg',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        },
        productVariantAttributes: [
          {
            id: 3,
            attributeType: { id: 1, name: 'Màu sắc', createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
            value: 'Space Gray',
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z'
          },
          {
            id: 4,
            attributeType: { id: 3, name: 'RAM', createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
            value: '18GB',
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z'
          }
        ],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    productId: 3,
    name: 'Áo Polo Nam Premium',
    description: 'Áo polo nam chất liệu cotton cao cấp, thiết kế thanh lịch phù hợp cho công sở và dạo phố',
    seller: mockSellers[0],
    status:ProductStatus.ACTIVE,
    category: mockCategories[2],
    variants: [
      {
        id: 3,
        sku: 'POLO-M-NAVY',
        price: 49.99,
        stock: 100,
        image: {
          id: 3,
          url: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=500',
          fileSize: 1024000,
          publicId: 'polo-shirt-navy',
          fileType: 'image/jpeg',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        },
        productVariantAttributes: [
          {
            id: 5,
            attributeType: { id: 1, name: 'Màu sắc', createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
            value: 'Navy Blue',
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z'
          },
          {
            id: 6,
            attributeType: { id: 4, name: 'Size', createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
            value: 'M',
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z'
          }
        ],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    productId: 4,
    name: 'Váy Maxi Hoa Nhí',
    description: 'Váy maxi họa tiết hoa nhí dễ thương, chất liệu voan mềm mại, phù hợp cho mùa hè',
    seller: mockSellers[0],
        status : ProductStatus.ACTIVE,

    category: mockCategories[3],
    variants: [
      {
        id: 4,
        sku: 'DRESS-MAXI-FL',
        price: 79.99,
        stock: 75,
        image: {
          id: 4,
          url: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=500',
          fileSize: 1024000,
          publicId: 'maxi-dress-floral',
          fileType: 'image/jpeg',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        },
        productVariantAttributes: [
          {
            id: 7,
            attributeType: { id: 1, name: 'Màu sắc', createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
            value: 'Floral Print',
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z'
          },
          {
            id: 8,
            attributeType: { id: 4, name: 'Size', createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
            value: 'S',
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z'
          }
        ],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    productId: 5,
    name: 'Nồi Cơm Điện Tử 1.8L',
    description: 'Nồi cơm điện tử thông minh 1.8L, công nghệ fuzzy logic, nấu cơm ngon và tiết kiệm điện',
    seller: mockSellers[0],
        status : ProductStatus.ACTIVE,

    category: mockCategories[4],
    variants: [
      {
        id: 5,
        sku: 'RICE-COOKER-18',
        price: 129.99,
        stock: 40,
        image: {
          id: 5,
          url: 'https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=500',
          fileSize: 1024000,
          publicId: 'rice-cooker',
          fileType: 'image/jpeg',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        },
        productVariantAttributes: [
          {
            id: 9,
            attributeType: { id: 5, name: 'Dung tích', createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
            value: '1.8L',
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z'
          }
        ],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    productId: 6,
    name: 'Sách "Đắc Nhân Tâm"',
    description: 'Cuốn sách kinh điển về nghệ thuật giao tiếp và ứng xử của Dale Carnegie',
    seller: mockSellers[0],
        status : ProductStatus.ACTIVE,

    category: mockCategories[5],
    variants: [
      {
        id: 6,
        sku: 'BOOK-DNT-VN',
        price: 15.99,
        stock: 200,
        image: {
          id: 6,
          url: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=500',
          fileSize: 1024000,
          publicId: 'book-dac-nhan-tam',
          fileType: 'image/jpeg',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        },
        productVariantAttributes: [
          {
            id: 10,
            attributeType: { id: 6, name: 'Ngôn ngữ', createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
            value: 'Tiếng Việt',
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z'
          }
        ],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];
