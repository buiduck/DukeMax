import { Link, Outlet, useLocation } from 'react-router-dom';
import { MdDashboard, MdMovie, MdPeople } from 'react-icons/md';
import DashboardHeader from './DashboardHeader';

const AdminLayout = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/5 bg-sky-700 text-white p-5 space-y-4">
        <h2 className="my-3 text-4xl font-bold">Admin Panel</h2>
        <hr className="my-4 md:min-w-full" />
        <nav className="text-xl space-y-6">
          <Link 
            to="/admin/dashboard" 
            className={`flex items-center p-2 rounded transition-all duration-300 ${location.pathname === '/admin/dashboard' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
          >
            <MdDashboard className="w-6 h-6 mr-2" />
            Dashboard
          </Link>
          <Link 
            to="/admin/movies" 
            className={`flex items-center p-2 rounded transition-all duration-300 ${location.pathname === '/admin/movies' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
          >
            <MdMovie className="w-6 h-6 mr-2" />
            Quản Lý Phim
          </Link>
          <Link 
            to="/admin/users" 
            className={`flex items-center p-2 rounded transition-all duration-300 ${location.pathname === '/admin/users' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
          >
            <MdPeople className="w-6 h-6 mr-2" />
            Quản Lý Tài Khoản
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        <DashboardHeader/>
        <Outlet /> {/* Render các component con như Dashboard, Movies, Users */}
      </div>
    </div>
  );
};

export default AdminLayout;
