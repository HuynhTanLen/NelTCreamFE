import React, { useState, useEffect } from "react";
import {
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Plus,
  Edit,
  Eye,
  LogOut,
  Menu,
} from "lucide-react";
import { motion } from "framer-motion";
import { Product, Order, OrderStatus } from "../../types";
import { productService } from "../../services/productService";
import { orderService } from "../../services/orderService";
import LoadingSpinner from "../../components/Common/LoadingSpinner";

export default function SellerDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "orders">(
    "overview"
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
  try {
    const res = await productService.getProducts(); 
    // res: ApiResponse<PageResponse<Product>>

    setProducts(res.result.content); // ✅ truyền đúng Product[]
    setOrders([]); 
  } catch (error) {
    console.error("Failed to fetch seller data:", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-blue-600">Seller Panel</h1>
          <p className="text-sm text-gray-500">Quản lý cửa hàng</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: "overview", name: "Tổng quan", icon: TrendingUp },
            { id: "products", name: "Sản phẩm", icon: Package },
            { id: "orders", name: "Đơn hàng", icon: ShoppingCart },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center w-full px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === tab.id
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <tab.icon className="w-5 h-5 mr-3" />
              {tab.name}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t">
          <button className="flex items-center text-sm text-red-600 font-medium">
            <LogOut className="w-4 h-4 mr-2" /> Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  label: "Sản phẩm",
                  value: products.length,
                  icon: Package,
                  color: "text-blue-600 bg-blue-100",
                },
                {
                  label: "Đơn hàng",
                  value: orders.length,
                  icon: ShoppingCart,
                  color: "text-green-600 bg-green-100",
                },
                {
                  label: "Doanh thu",
                  value: "$0",
                  icon: DollarSign,
                  color: "text-purple-600 bg-purple-100",
                },
                {
                  label: "Tăng trưởng",
                  value: "+0%",
                  icon: TrendingUp,
                  color: "text-yellow-600 bg-yellow-100",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="bg-white shadow rounded-xl p-6 flex items-center"
                >
                  <div
                    className={`p-3 rounded-lg ${card.color} flex items-center justify-center`}
                  >
                    <card.icon className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">{card.label}</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {card.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Quản lý sản phẩm</h2>
                <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" /> Thêm sản phẩm
                </button>
              </div>
              <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                    <tr>
                      <th className="px-6 py-3 text-left">Sản phẩm</th>
                      <th className="px-6 py-3 text-left">Danh mục</th>
                      <th className="px-6 py-3 text-left">Giá</th>
                      <th className="px-6 py-3 text-left">Tồn kho</th>
                      <th className="px-6 py-3 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {products.map((p) => {
                      const variant = p.variants[0];
                      return (
                        <tr key={p.productId} className="hover:bg-gray-50">
                          <td className="px-6 py-4 flex items-center">
                            <img
                              src={
                                variant?.image?.url ||
                                "https://via.placeholder.com/60"
                              }
                              alt={p.name}
                              className="w-12 h-12 rounded-lg object-cover mr-3"
                            />
                            <div>
                              <div className="font-medium">{p.name}</div>
                              <div className="text-xs text-gray-500">
                                <tr key={variant.id}>
                                    <td>{variant.id}</td>   {/* hoặc bỏ cột này luôn */}
                                    <td>{variant.price}</td>
                                    <td>{variant.stock}</td>
                                </tr>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">{p.categoryId.name}</td>
                          <td className="px-6 py-4">${variant?.price}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                (variant?.stock || 0) > 10
                                  ? "bg-green-100 text-green-700"
                                  : (variant?.stock || 0) > 0
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {variant?.stock || 0} còn lại
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-800">
                              <Edit className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Quản lý đơn hàng</h2>
              {orders.length === 0 ? (
                <div className="bg-white p-12 rounded-xl shadow text-center text-gray-500">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  Chưa có đơn hàng nào
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                      <tr>
                        <th className="px-6 py-3 text-left">Đơn hàng</th>
                        <th className="px-6 py-3 text-left">Khách hàng</th>
                        <th className="px-6 py-3 text-left">Tổng tiền</th>
                        <th className="px-6 py-3 text-left">Trạng thái</th>
                        <th className="px-6 py-3 text-right">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {orders.map((o) => (
                        <tr key={o.orderId} className="hover:bg-gray-50">
                          <td className="px-6 py-4">#{o.orderId}</td>
                          <td className="px-6 py-4">{o.fullName}</td>
                          <td className="px-6 py-4">${o.totalAmount}</td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                              {o.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-blue-600 hover:text-blue-800">
                              Chi tiết
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
