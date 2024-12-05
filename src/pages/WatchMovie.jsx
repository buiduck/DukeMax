import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const WatchMovie = () => {
  const { movieSlug } = useParams(); // Lấy movieSlug từ URL
  const [movieData, setMovieData] = useState(null); // Lưu thông tin phim
  const [episodes, setEpisodes] = useState([]); // Lưu danh sách các tập phim
  const [selectedEpisode, setSelectedEpisode] = useState(null); // Tập phim đang được phát

  // Fetch dữ liệu phim từ API
  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await axios.get(`/api/movie/detail/${movieSlug}`);
        const data = response.data;
        console.log('hello',data)
        // Lưu thông tin phim
        setMovieData(data);

        // Lấy danh sách các tập phim từ StreamData
        if (data.StreamData && data.StreamData.length > 0) {
          const episodeList = data.StreamData[0].Episodes; // Danh sách tập từ StreamData
          setEpisodes(episodeList);
          if (episodeList.length > 0) {
            setSelectedEpisode(episodeList[0].LinkEmbed); // Chọn tập đầu tiên
          }
        }
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovieData();
  }, [movieSlug]);

  if (!movieData) {
    return (
        <div className="flex justify-center items-center h-screen">
          <div className="border-t-4 border-blue-500 border-solid  w-16 h-16 rounded-full animate-spin"></div>
        </div>
    );
  }

  return (
      <div className="container mx-auto p-4">
        {/* Thông tin phim */}
        <div className="movie-header mb-8">
          <h1 className="text-3xl text-white font-bold mb-2">{movieData.Name}</h1>
          <p className="text-gray-200">{movieData.Content}</p>
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
          <p><strong>Năm phát hành:</strong> {movieData.Year}</p>
          <p><strong>Thể loại:</strong> {movieData.Categories.map(cat => cat.Name).join(", ")}</p>
          <p><strong>Quốc gia:</strong> {movieData.Countries.map(c => c.Name).join(", ")}</p>
          <p><strong>Đạo diễn:</strong> {movieData.Directors.map(d => d.Name).join(", ")}</p>
          <p><strong>Chất lượng:</strong> {movieData.Quality}</p>
          <p><strong>Ngôn ngữ:</strong> {movieData.Lang}</p>
          <p><strong>Thời lượng:</strong> {movieData.Time}</p>
        </div>

        {/* Danh sách các tập phim */}
        {episodes.length > 0 && (
            <div className="episodes bg-gray-700 text-white p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Danh sách các tập phim</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {episodes.map((episode) => (
                    <button
                        key={episode.Id}
                        className={`p-2 rounded-md transition-all ${
                            selectedEpisode === episode.LinkEmbed
                                ? "bg-blue-600 text-white"
                                : "bg-white text-slate-800"
                        } hover:bg-gradient-to-l hover:from-green-500 hover:to-blue-500 hover:scale-105`}
                        onClick={() => setSelectedEpisode(episode.LinkEmbed)}
                    >
                      {episode.Name}
                    </button>
                ))}
              </div>
            </div>
        )}
      </div>
  );
};

export default WatchMovie;
