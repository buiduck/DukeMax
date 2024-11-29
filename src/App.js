import {Outlet} from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileNavigation from './components/MobileNavigation';
import axios from 'axios';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setBannerData} from './store/dukemaxSlice';
import {ReactKeycloakProvider} from "@react-keycloak/web";
import KeycloakService from "./components/keycloak";

function App() {
    const dispatch = useDispatch();
    const fetchTrendingData = async () => {
        try {
            const response = await axios.get('/danh-sach/phim-moi-cap-nhat?page=1')

            dispatch(setBannerData(response.data.items))
            console.log("respone", response.data.items)
        } catch (error) {
            console.log("error", error)
        }
    }
    // const fetchConfiguration = async () => {
    //   try {
    //       const response = await axios.get('https://phimimg.com')

    //       dispatch(setImageURL(response.data.items))
    //       console.log("respone",response.data.items)
    //   } catch (error) {
    //     console.log("error",error)
    //   }
    // }

    useEffect(() => {
        fetchTrendingData()
        // fetchConfiguration()
    }, [])

    return (
        <ReactKeycloakProvider authClient={KeycloakService.keycloak} initOptions={{
            onLoad: 'check-sso',
            checkLoginIframe: false

        }}>
            <main className='pb-14 lg:pb-0'>
                <Header/>
                <div className='pt-16 min-h-[90vh]'>
                    <Outlet/>
                </div>
                <Footer/>
                <MobileNavigation/>
            </main>
        </ReactKeycloakProvider>
    );
}

export default App;


