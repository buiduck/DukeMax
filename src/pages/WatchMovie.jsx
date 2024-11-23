import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const WatchMovie = () => {
  const { movieSlug } = useParams(); // Lấy movieSlug từ URL
  const [movieData, setMovieData] = useState(null);
  const [episodes, setEpisodes] = useState([]); // Lưu danh sách các tập phim
  const [selectedEpisode, setSelectedEpisode] = useState(null); // Tập phim đang được phát

  // Fetch dữ liệu phim từ API
  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(`https://phimapi.com/phim/${movieSlug}`);
        const data = await response.json();
        setMovieData(data.movie); // Lưu thông tin phim
        if (data.episodes && data.episodes.length > 0) {
          setEpisodes(data.episodes[0].server_data); // Lấy danh sách tập phim
          setSelectedEpisode(data.episodes[0].server_data[0].link_embed); // Mặc định chọn tập đầu tiên
        }
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchMovieData();
  }, [movieSlug]);

  if (!movieData) {
    return <div>Loading...</div>;
  }

  // Kiểm tra nếu là phim bộ hay phim lẻ
  const isSeries = episodes && episodes.length > 0;

  return (
    <div className="container mx-auto p-4">
      {/* Thông tin phim */}
      <div className="movie-header mb-8">
        <h1 className="text-3xl text-white font-bold mb-2">{movieData.name}</h1>
        <p className="text-gray-200">{movieData.content}</p>
      </div>

      {/* Video player */}
      <div className="video-player mb-8">
        <div className="relative pb-[56.25%]">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={selectedEpisode}
            frameBorder="0"
            allowFullScreen
            title="Movie Video"
          />
        </div>
      </div>

      {/* Thông tin chi tiết */}
      <div className="movie-details bg-gray-800 text-white p-4 rounded-lg mb-8">
        <p><strong>Năm phát hành:</strong> {movieData.year}</p>
        <p><strong>Thể loại:</strong> {movieData.category.map(cat => cat.name).join(', ')}</p>
        <p><strong>Quốc gia:</strong> {movieData.country.map(c => c.name).join(', ')}</p>
        <p><strong>Diễn viên:</strong> {movieData.actor.join(', ')}</p>
        <p><strong>Chất lượng:</strong> {movieData.quality}</p>
        <p><strong>Ngôn ngữ:</strong> {movieData.lang}</p>
      </div>

      {/* Danh sách các tập phim */}
      {isSeries && (
        <div className="episodes bg-gray-700 text-white p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Danh sách các tập phim</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {episodes.map((episode, index) => (
              <button
                key={episode.slug}
                className={`bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600 transition-all ${
                  selectedEpisode === episode.link_embed ? 'bg-orange-700' : ''
                }`}
                onClick={() => setSelectedEpisode(episode.link_embed)} // Chọn tập phim
              >
                {episode.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchMovie;
