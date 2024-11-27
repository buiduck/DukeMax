import React from 'react';
import { MdSearch, MdNotifications, MdSettings } from 'react-icons/md'; // Các icon cần thiết

const DashboardHeader = () => {
  return (
    <div className="bg-white shadow-md p-6 flex justify-between items-center">
      {/* Bên trái: Chữ Dashboard */}
      <div className="text-2xl font-bold text-gray-700">
        Dashboard
      </div>

      {/* Bên phải: Các icon và tìm kiếm */}
      <div className="flex items-center space-x-6">
        {/* Tìm kiếm */}
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="bg-gray-200 rounded-full pl-10 pr-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-6 h-6" />
        </div>

        {/* Icon thông báo */}
        <div className="relative">
          <MdNotifications className="w-8 h-8 text-gray-700 cursor-pointer hover:text-blue-500 transition-all duration-300" />
          <div className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </div>
        </div>

        {/* Icon cài đặt */}
        <MdSettings className="w-8 h-8 text-gray-700 cursor-pointer hover:text-blue-500 transition-all duration-300" />

        {/* Avatar hoặc Sign In */}
        <div className="flex items-center space-x-2 cursor-pointer">
          {/* Nếu không có avatar */}
          {/* <span className="text-gray-700 text-sm">Sign In</span> */}

          {/* Nếu có avatar */}
          <img
            src="https://randomuser.me/api/portraits/men/36.jpg"
            alt="Avatar"
            className="w-9 h-9 rounded-full border-2 border-gray-300"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
