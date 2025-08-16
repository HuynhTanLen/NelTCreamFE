// import React, { useState, useEffect } from 'react';
// import { Package, ShoppingCart, DollarSign, TrendingUp, Plus, Edit, Eye } from 'lucide-react';
// import { Product, Order, OrderStatus } from '../../types';
// import { productService } from '../../services/productService';
// import { orderService } from '../../services/orderService';
// import { mockProducts } from '../../Data/mockData';
// import LoadingSpinner from '../../components/Common/LoadingSpinner';

// export default function SellerDashboard() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       // Mock data - replace with actual API calls
//       setProducts(mockProducts);
//       setOrders([]); // Mock empty orders
//     } catch (error) {
//       console.error('Failed to fetch seller data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdateOrderStatus = async (orderId: number, status: OrderStatus) => {
//     try {
//       await orderService.updateOrderStatus(orderId, { status });
//       // Refresh orders
//       fetchData();
//       alert('Đã cập nhật trạng thái đơn hàng!');
//     } catch (error) {
//       console.error('Failed to update order status:', error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <LoadingSpinner size="lg" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
//           <p className="text-gray-600 mt-2">Quản lý cửa hàng của bạn</p>
//         </div>

//         {/* Tabs */}
//         <div className="border-b border-gray-200 mb-8">
//           <nav className="-mb-px flex space-x-8">
//             {[
//               { id: 'overview', name: 'Tổng quan', icon: TrendingUp },
//               { id: 'products', name: 'Sản phẩm', icon: Package },
//               { id: 'orders', name: 'Đơn hàng', icon: ShoppingCart }
//             ].map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id as any)}
//                 className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
//                   activeTab === tab.id
//                     ? 'border-blue-500 text-blue-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 <tab.icon className="w-5 h-5" />
//                 <span>{tab.name}</span>
//               </button>
//             ))}
//           </nav>
//         </div>

//         {/* Overview Tab */}
//         {activeTab === 'overview' && (
//           <div className="space-y-8">
//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//                 <div className="flex items-center">
//                   <div className="flex-shrink-0">
//                     <Package className="w-8 h-8 text-blue-600" />
//                   </div>
//                   <div className="ml-4">
//                     <p className="text-sm font-medium text-gray-600">Sản phẩm</p>
//                     <p className="text-2xl font-bold text-gray-900">{products.length}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//                 <div className="flex items-center">
//                   <div className="flex-shrink-0">
//                     <ShoppingCart className="w-8 h-8 text-green-600" />
//                   </div>
//                   <div className="ml-4">
//                     <p className="text-sm font-medium text-gray-600">Đơn hàng</p>
//                     <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//                 <div className="flex items-center">
//                   <div className="flex-shrink-0">
//                     <DollarSign className="w-8 h-8 text-purple-600" />
//                   </div>
//                   <div className="ml-4">
//                     <p className="text-sm font-medium text-gray-600">Doanh thu</p>
//                     <p className="text-2xl font-bold text-gray-900">$0</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//                 <div className="flex items-center">
//                   <div className="flex-shrink-0">
//                     <TrendingUp className="w-8 h-8 text-yellow-600" />
//                   </div>
//                   <div className="ml-4">
//                     <p className="text-sm font-medium text-gray-600">Tăng trưởng</p>
//                     <p className="text-2xl font-bold text-gray-900">+0%</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Recent Activity */}
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//               <h2 className="text-xl font-bold text-gray-900 mb-4">Hoạt động gần đây</h2>
//               <div className="text-center py-8 text-gray-500">
//                 Chưa có hoạt động nào
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Products Tab */}
//         {activeTab === 'products' && (
//           <div className="space-y-6">
//             <div className="flex justify-between items-center">
//               <h2 className="text-xl font-bold text-gray-900">Quản lý sản phẩm</h2>
//               <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
//                 <Plus className="w-4 h-4" />
//                 <span>Thêm sản phẩm</span>
//               </button>
//             </div>

//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Sản phẩm
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Danh mục
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Giá
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Tồn kho
//                     </th>
//                     <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Thao tác
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {products.map((product) => {
//                     const primaryVariant = product.variants[0];
//                     const imageUrl = primaryVariant?.image?.url || 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=100';
                    
//                     return (
//                       <tr key={product.productId}>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center">
//                             <div className="flex-shrink-0 h-12 w-12">
//                               <img
//                                 className="h-12 w-12 rounded-lg object-cover"
//                                 src={imageUrl}
//                                 alt={product.name}
//                               />
//                             </div>
//                             <div className="ml-4">
//                               <div className="text-sm font-medium text-gray-900">
//                                 {product.name}
//                               </div>
//                               <div className="text-sm text-gray-500">
//                                 SKU: {primaryVariant?.sku}
//                               </div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           {product.categoryId.name}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                           ${primaryVariant?.price.toFixed(2)}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                             (primaryVariant?.stock || 0) > 10
//                               ? 'bg-green-100 text-green-800'
//                               : (primaryVariant?.stock || 0) > 0
//                               ? 'bg-yellow-100 text-yellow-800'
//                               : 'bg-red-100 text-red-800'
//                           }`}>
//                             {primaryVariant?.stock || 0} còn lại
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                           <div className="flex justify-end space-x-2">
//                             <button className="text-blue-600 hover:text-blue-900">
//                               <Eye className="w-4 h-4" />
//                             </button>
//                             <button className="text-green-600 hover:text-green-900">
//                               <Edit className="w-4 h-4" />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {/* Orders Tab */}
//         {activeTab === 'orders' && (
//           <div className="space-y-6">
//             <h2 className="text-xl font-bold text-gray-900">Quản lý đơn hàng</h2>

//             {orders.length === 0 ? (
//               <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
//                 <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có đơn hàng nào</h3>
//                 <p className="text-gray-600">Đơn hàng sẽ xuất hiện ở đây khi khách hàng mua sản phẩm của bạn</p>
//               </div>
//             ) : (
//               <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Đơn hàng
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Khách hàng
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Tổng tiền
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Trạng thái
//                       </th>
//                       <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Thao tác
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {orders.map((order) => (
//                       <tr key={order.orderId}>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm font-medium text-gray-900">
//                             #{order.orderId}
//                           </div>
//                           <div className="text-sm text-gray-500">
//                             {new Date(order.createdAt).toLocaleDateString('vi-VN')}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm font-medium text-gray-900">
//                             {order.fullName}
//                           </div>
//                           <div className="text-sm text-gray-500">
//                             {order.email}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                           ${order.totalAmount.toFixed(2)}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <select
//                             value={order.status}
//                             onChange={(e) => handleUpdateOrderStatus(order.orderId, e.target.value as OrderStatus)}
//                             className="text-sm border border-gray-300 rounded px-2 py-1"
//                           >
//                             <option value={OrderStatus.PENDING}>Chờ xử lý</option>
//                             <option value={OrderStatus.PROCESSING}>Đang xử lý</option>
//                             <option value={OrderStatus.SHIPPED}>Đã gửi</option>
//                             <option value={OrderStatus.DELIVERED}>Đã giao</option>
//                             <option value={OrderStatus.CANCELLED}>Đã hủy</option>
//                           </select>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                           <button className="text-blue-600 hover:text-blue-900">
//                             Chi tiết
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }