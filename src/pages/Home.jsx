import BannerHome from "../components/BannerHome"
import HorizontalScollCard from "../components/HorizontalScollCard"
import useFetch from "../hooks/useFetch"

const Home = () => {
  const { data: leData } = useFetch('https://phimapi.com/v1/api/danh-sach/phim-le');
  const { data: boData } = useFetch('https://phimapi.com/v1/api/danh-sach/phim-bo');
  const { data: hoathinhData } = useFetch('https://phimapi.com/v1/api/danh-sach/hoat-hinh');
  const { data: onTheAirShowData } = useFetch('https://phimapi.com/v1/api/danh-sach/tv-shows');

  return (
    <div>
       <BannerHome/>
       <HorizontalScollCard data={leData} heading={"Phim lẻ"} media_type={"movie"} />
       <HorizontalScollCard data={boData} heading={"Phim bộ"} media_type={"movie"} />
       <HorizontalScollCard data={hoathinhData} heading={"Hoạt hình"} media_type={"movie"} />
       <HorizontalScollCard data={onTheAirShowData} heading={"Chương trình TV"} media_type={"tv"} />
    </div>
  )
}

export default Home