import { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import Divider from "../components/Divider";
import HorizontalScrollCard from "../components/HorizontalScollCard";
import VideoPlay from "../components/VideoPlay";
const DetailsPage = () => {
    const params = useParams();
    const slug = params.id;
    // State để lưu dữ liệu chi tiết phim
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // State cho việc hiển thị trailer
    const [playVideo, setPlayVideo] = useState(false);
    const [playVideoId,setPlayVideoId] = useState("")

    // Xử lý phân trang
    const getRandomPage = (range = 100) => Math.floor(Math.random() * range) + 1;

    // State cho movieList và seriesList
    const [movieList, setMovieList] = useState(null);
    const [seriesList, setSeriesList] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const detailResponse = await axios.get(`/api/movie/detail/${slug}`);
                setData(detailResponse.data);
                console.log(data)

                const randomMoviePage = getRandomPage();
                const randomSeriesPage = getRandomPage();
                const [movieResponse, seriesResponse] = await Promise.all([
                    axios.get(`/api/movie/filter?type=single&&pageNumber=${randomMoviePage}&pageSize=10`),
                    axios.get(`/api/movie/filter?type=series&&pageNumber=${randomSeriesPage}&pageSize=10`),
                ]);

                setMovieList(movieResponse.data);
                setSeriesList(seriesResponse.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    const handlePlayVideo = (data) =>{
        setPlayVideoId(data)
        setPlayVideo(true)
    }
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching details: {error.message}</p>;

    return <div>
        <div className='w-full h-[380px] relative hidden lg:block'>
            <div className='w-full h-full '>
                <img src={data?.ThumbUrl} className='h-full w-full object-cover'/>
            </div>
            <div className='absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent'></div>
        </div>
        <div className="container mx-auto px-3 py-13 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10">
            <div className="relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60">
                <img src={data?.PosterUrl} className='h-80 w-60 object-cover rounded'/>
                <div className="flex space-x-5 mt-3  ">
                    <button
                        onClick={() => handlePlayVideo(data)}
                        className="bg-white text-lg text-slate-800 py-2
                                        rounded-xl font-bold w-1/2 hover:bg-gradient-to-l
                                        from-green-500 to-blue-500 hover:scale-103
                                        transition-all"> Trailer
                    </button>
                    {/* Nút Xem Phim */}
                    <button
                        className="bg-white text-lg text-slate-800 py-2
                                          rounded-xl font-bold w-1/2 hover:bg-gradient-to-l
                                        from-green-500 to-blue-500 hover:scale-103
                                        transition-all">
                        <Link to={`/watch/${data?.Slug}`}>Xem Phim</Link>
                    </button>
                </div>
            </div>
            <div>
                <h2 className='text-2xl lg:text-4xl font-bold text-white'>
                    {data?.Title || data?.Name}</h2>
                <div className="flex items-center gap-3">
                    <p>Tình trạng: {data?.EpisodeCurrent} </p>
                    <span>|</span>
                    <p>
                        Năm phát hành: {data?.Year}
                    </p>
                    <span>|</span>
                    <p>Thời lượng: {data?.Time}</p>
                    <span>|</span>
                    <p>Chất lượng: {data?.Quality}</p>
                </div>
                <Divider/>
                <div>
                    <h3 className='text-2xl font-bold text-white mb-1'>Nội Dung</h3>
                    <p>{data?.Content}</p>
                    <Divider/>
                    <div className='flex items-center gap-3 my-3 text-white text-center'>
                        <p>
                            Status : {data?.Status}
                        </p>
                        <span>|</span>
                        <p>
                            Ngôn ngữ : {data?.Lang}
                        </p>
                        <span>|</span>
                        <p>
                            Số tập : {data?.EpisodeTotal}
                        </p>
                        <p>
                            Quốc gia : {data?.Countries?.[0]?.Name}
                        </p>
                        <span>|</span>
                        <p>
                            Thể loại: {data?.Categories?.map((item) => item.Name).join(', ')}
                        </p>
                    </div>
                    <Divider/>
                </div>
                <div>
                    <p><span className='text-white'>Đạo diễn</span> : {data?.Directors?.[0]?.Name}</p>
                    <Divider/>
                    <p>
                        <span className='text-white'>Diễn viên : {data?.Actors?.join(", ")}</span>
                    </p>
                </div>
            </div>
        </div>
        <div>
            <HorizontalScrollCard data={movieList} heading={"Phim lẻ"} media_type={"movie"}/>
            <HorizontalScrollCard data={seriesList} heading={"Phim bộ"} media_type={"tv"}/>
        </div>
        {
            playVideo && (
                <VideoPlay data={playVideoId} close={() => setPlayVideo(false)} />
            )
        }
    </div>;
};

export default DetailsPage;
