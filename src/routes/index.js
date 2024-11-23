import {createBrowserRouter} from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home'
import ExplorePage from '../pages/ExplorePage'
import DetailsPage from '../pages/DetailsPage'
import SearchPage from '../pages/SearchPage';
import WatchMovie from '../pages/WatchMovie'
const router =  createBrowserRouter([
    {
        path:'/',
        element: <App/>,
        children :[
            {
                path:"",
                element: <Home/>
            },
            {
                path:":explore",
                element: <ExplorePage/>
            },
            {
                path:":explore/:id",
                element: <DetailsPage/>
            },
            {
                path:"search",
                element: <SearchPage/>
            },
            {
                path: "watch/:movieSlug", 
                element: <WatchMovie />
            }
        ]
    }
])
export default router

