import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import ExplorePage from '../pages/ExplorePage';
import DetailsPage from '../pages/DetailsPage';
import SearchPage from '../pages/SearchPage';
import WatchMovie from '../pages/WatchMovie';
import AdminLayout from '../admin/AdminLayout';
import AdminDashboard from '../admin/AdminDashboard';
import MovieList from '../admin/movie/MovieList';
import AdminUserList from '../admin/user/AdminUserList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'explore',
        element: <ExplorePage />
      },
      {
        path: 'explore/:id',
        element: <DetailsPage />
      },
      {
        path: 'search',
        element: <SearchPage />
      },
      {
        path: 'watch/:movieSlug',
        element: <WatchMovie />
      },
    ]
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: 'dashboard',
        element: <AdminDashboard />
      },
      {
        path: 'movies',
        element: <MovieList />
      },
      {
        path: 'users',
        element: <AdminUserList />
      }
    ]
  }
]);

export default router;
