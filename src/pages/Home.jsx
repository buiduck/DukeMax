import BannerHome from "../components/BannerHome"
import { useSelector } from 'react-redux'
import HorizontalScollCard from "../components/HorizontalScollCard"
import useFetch from "../hooks/useFetch"

const Home = () => {
  const trendingData = useSelector(state => state.dukemaxData.bannerData)
  const { data : nowPlayingData} = useFetch('/movie/now_playing')
  const { data : topRatedData} = useFetch('/movie/top_rated')
  const { data : popularData} = useFetch('/tv/popular')
  const { data : onTheAirShowData } = useFetch('/tv/on_the_air')

  return (
    <div>
       <BannerHome/>
       <HorizontalScollCard  data={trendingData} heading={"Phim lẻ mới"} trending={true}/>
       <HorizontalScollCard  data={nowPlayingData} heading={"Xem ngay bây giờ"} media_type={"movie"}/>
       <HorizontalScollCard  data={topRatedData} heading={"Bảng Xếp hạng hàng đầu"} media_type={"movie"}/>
       <HorizontalScollCard  data={popularData} heading={"Chương trình TV phổ biển"}  media_type={"tv"}/>
       <HorizontalScollCard data={onTheAirShowData} heading={"Đang phát sóng"} media_type={"tv"}/>
    </div>
  )
}

export default Home