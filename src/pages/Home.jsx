import { useState, useEffect } from 'react';
import axios from 'axios';
import BannerHome from "../components/BannerHome";
import HorizontalScollCard from "../components/HorizontalScollCard";

const Home = () => {
  // State để lưu dữ liệu của từng type
  const [data, setData] = useState({
    single: null,
    tvshows: null,
    series: null,
    hoathinh: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const types = ['single', 'tvshows', 'series', 'hoathinh'];
        const requests = types.map((type) =>
            axios.get(`api/movie/filter?type=${type}&pageSize=36`)
        );
        const responses = await Promise.all(requests);

        // Lưu dữ liệu vào state theo type
        setData({
          single: responses[0].data,
          tvshows: responses[1].data,
          series: responses[2].data,
          hoathinh: responses[3].data,
        });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching movies: {error.message}</p>;

  return (
      <div>
        <BannerHome />
        <HorizontalScollCard data={data.single} heading="Phim lẻ" media_type="movie" />
        <HorizontalScollCard data={data.tvshows} heading="Chương trình TV" media_type="tv" />
        <HorizontalScollCard data={data.series} heading="Phim bộ" media_type="movie" />
        <HorizontalScollCard data={data.hoathinh} heading="Hoạt hình" media_type="movie" />
      </div>
  );
};

export default Home;