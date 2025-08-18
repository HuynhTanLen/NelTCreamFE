import React, { useState, useEffect } from 'react';
import { Users, Package, ShoppingCart, TrendingUp, Plus } from 'lucide-react';
import { Category, Seller } from '../../types';
import { adminService } from '../../services/adminService';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import { sellerService } from '../../services/SellerService';

export default function AdminDashboard() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeSellers, setActiveSellers] = useState<Seller[]>([]);
  const [pendingSellers, setPendingSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'categories' | 'sellers'>('overview');
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
  setLoading(true);
  try {
    // Categories
    const categoriesRes = await adminService.getCategories();
    if (categoriesRes.data.code === 1000) setCategories(categoriesRes.data.result);

    // Active Sellers
    const activeRes = await sellerService.getAllActiveSellers();
    setActiveSellers(activeRes.result?.data || []);
    console.log("Active sellers:", activeRes.result?.data);

    // Pending Sellers
    const pendingRes = await sellerService.getAllNonActiveSellers();
    setPendingSellers(pendingRes.result?.data || []);
    console.log("Pending sellers:", pendingRes.result?.data);

  } catch (error) {
    console.error('Failed to fetch admin data:', error);
  } finally {
    setLoading(false);
  }
};



  // ----- Categories -----
  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      const res = await adminService.createCategory({ name: newCategoryName });
      if (res.data.code === 1000 && res.data.result) {
        setCategories([...categories, res.data.result]);
        alert('Tạo danh mục thành công!');
      }
      setNewCategoryName('');
      setShowAddCategory(false);
    } catch (error) {
      console.error(error);
      alert('Tạo danh mục thất bại!');
    }
  };

  const handleUpdateCategory = async (category: Category) => {
    try {
      await adminService.updateCategory(category.categoryId, { name: category.name });
      alert('Cập nhật danh mục thành công!');
    } catch (error) {
      console.error(error);
      alert('Cập nhật thất bại!');
    }
  };

  const handleDeleteCategory = async (categoryId: number) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) return;
    try {
      const res = await adminService.deleteCategory(categoryId);
      if (res.data.code === 1000) {
        setCategories(categories.filter(c => c.categoryId !== categoryId));
        alert('Xóa danh mục thành công!');
      }
    } catch (error) {
      console.error(error);
      alert('Xóa danh mục thất bại!');
    }
  };

  // ----- Sellers -----
   const handleActiveSeller = async (sellerId: number, isActive: boolean) => {
    try {
      await sellerService.approveSeller(sellerId, { approved: isActive });
      alert(isActive ? 'Đã phê duyệt seller!' : 'Đã từ chối seller!');
      
      // Cập nhật state
      if (isActive) {
        const seller = pendingSellers.find(s => s.id === sellerId);
        if (seller) setActiveSellers(prev => [...prev, seller]);
      }
      setPendingSellers(prev => prev.filter(s => s.id !== sellerId));
    } catch (error) {
      console.error('Failed to approve seller:', error);
      alert('Phê duyệt thất bại!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Quản lý hệ thống thương mại điện tử</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', name: 'Tổng quan', icon: TrendingUp },
              { id: 'categories', name: 'Danh mục', icon: Package },
              { id: 'sellers', name: 'Sellers', icon: Users }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Tổng Users</p>
                  <p className="text-2xl font-bold text-gray-900">1,234</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <Package className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Sản phẩm</p>
                  <p className="text-2xl font-bold text-gray-900">567</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <ShoppingCart className="w-8 h-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Đơn hàng</p>
                  <p className="text-2xl font-bold text-gray-900">89</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Doanh thu</p>
                  <p className="text-2xl font-bold text-gray-900">$12,345</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Quản lý danh mục</h2>
              <button
                onClick={() => setShowAddCategory(true)}
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" /> Thêm danh mục
              </button>
            </div>
            {showAddCategory && (
              <div className="bg-white p-6 rounded shadow mb-4">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={e => setNewCategoryName(e.target.value)}
                  placeholder="Tên danh mục"
                  className="border px-3 py-2 rounded w-full mb-2"
                />
                <button onClick={handleCreateCategory} className="bg-green-600 text-white px-4 py-2 rounded mr-2">
                  Tạo
                </button>
                <button onClick={() => setShowAddCategory(false)} className="bg-gray-600 text-white px-4 py-2 rounded">
                  Hủy
                </button>
              </div>
            )}

            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Tên danh mục</th>
                  <th className="px-4 py-2 border">Ngày tạo</th>
                  <th className="px-4 py-2 border text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, idx) => (
                  <tr key={category.categoryId} className="border-b">
                    <td className="px-4 py-2 border">{category.categoryId}</td>
                    <td className="px-4 py-2 border">
                      <input
                        type="text"
                        value={category.name}
                        onChange={e => {
                          const newCategories = [...categories];
                          newCategories[idx] = { ...newCategories[idx], name: e.target.value };
                          setCategories(newCategories);
                        }}
                        className="border px-2 py-1 w-full"
                      />
                    </td>
                    <td className="px-4 py-2 border">
                      {category.createdAt ? new Date(category.createdAt).toLocaleDateString('vi-VN') : '--'}
                    </td>
                    <td className="px-4 py-2 border text-center space-x-2">
                      <button onClick={() => handleUpdateCategory(category)} className="px-3 py-1 bg-green-500 text-white rounded">
                        ✔
                      </button>
                      <button onClick={() => handleDeleteCategory(category.categoryId)} className="px-3 py-1 bg-red-500 text-white rounded">
                        ✖
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Sellers Tab */}
        {activeTab === 'sellers' && (
          <div className="space-y-6">
            {/* Pending Sellers */}
            <div>
              <h3 className="text-lg font-medium mb-2">
                Sellers chưa phê duyệt ({pendingSellers?.length || 0})
              </h3>
               {pendingSellers?.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th>Seller</th>
                    <th>Email</th>
                    <th>Ngày đăng ký</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                        {pendingSellers.map((seller) => (
                    <tr key={seller.id} className="border-b">
                      <td className="px-4 py-2 border">{seller.user?.fullName}</td>
                      <td className="px-4 py-2 border">{seller.email}</td>
                      <td className="px-4 py-2 border">{new Date(seller.createdAt).toLocaleDateString('vi-VN')}</td>
                      <td className="px-4 py-2 border text-center space-x-2">
                        <button onClick={() => handleApproveSeller(seller.id, true)} className="px-3 py-1 bg-green-500 text-white rounded">✔</button>
                        <button onClick={() => handleApproveSeller(seller.id, false)} className="px-3 py-1 bg-red-500 text-white rounded">✖</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              ) : <p>Không có seller chờ duyệt</p>}
            </div>

            {/* Active Sellers */}
            <div>
              <h3 className="text-lg font-medium mb-2">Sellers đã phê duyệt ({activeSellers?.length || 0})</h3>
              {activeSellers?.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th>Seller</th>
                    <th>Email</th>
                    <th>Ngày tham gia</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                 {activeSellers.map((seller) => (
                      <tr key={seller.id} className="border-b">
                        <td className="px-4 py-2 border">{seller.user?.fullName}</td>
                        <td className="px-4 py-2 border">{seller.email}</td>
                        <td className="px-4 py-2 border">{new Date(seller.createdAt).toLocaleDateString('vi-VN')}</td>
                        <td className="px-4 py-2 border">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            Đã phê duyệt
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
               ) : <p>Chưa có seller nào được duyệt</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
