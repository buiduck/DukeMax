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
import AdminAddMovie from '../admin/movie/AdminAddMovie';
import AdminEditMovie from '../admin/movie/AdminEditMovie'
import BlogPage from '../pages/BlogPage';
import DetailsBlog from '../pages/DetailsBlog';
import AdminBlogList from '../admin/blog/AdminBlogList'
import AdminBlogCreate from '../admin/blog/AdminBlogCreate'
import AdminBlogEdit from '../admin/blog/AdminBlogEdit'
import Multiselect from '../pages/Multiselect';
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
        path: ':explore',
        element: <ExplorePage />
      },
      {
        path: ':explore/:id',
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
      {
        path: 'blog',
        element: <BlogPage />
      },
      {
        path: 'blog/:id',
        element: <DetailsBlog />
      },
      {
        path: 'mutliselect',
        element: <Multiselect/>
      }
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
        path: 'blog',
        element: <AdminBlogList />  
      },
      {
        path:'blog/add-blog',
        element :<AdminBlogCreate/>
      },
      {
        path: 'blog/edit-blog/:id',
        element: <AdminBlogEdit />  
      },
      {
        path: 'movies/add-movie',
        element: <AdminAddMovie />  
      },
      {
        path: 'movies/edit-movie/:movieId',
        element: <AdminEditMovie />  
      },
    ]
  }
]);

export default router;
