// import { useParams } from "react-router-dom"
// import useFetchDetails from "../hooks/useFetchDetails"
// import useFetch from "../hooks/useFetch"
// import {useSelector} from 'react-redux'
// import moment from 'moment'
// import Divider from "../components/Divider"
// import HorizontalScollCard from '../components/HorizontalScollCard'
// import { useState } from "react"
// import VideoPlay from '../components/VideoPlay'

// const DetailsPage = () => {
//   const imageURL = useSelector(state => state.dukemaxData.imageURL)
//   const params = useParams()
//   const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`)
//   const { data :castData} = useFetchDetails(`/${params?.explore}/${params?.id}/credits`)
//   const { data : similarData } = useFetch(`/${params?.explore}/${params?.id}/similar`)
//   const { data : recommendationData } = useFetch(`/${params?.explore}/${params?.id}/recommendations`)
//   const [playVideo,setPlayVideo] = useState(false)
//   const [playVideoId,setPlayVideoId] = useState("")

//   const handlePlayVideo=(data)=>{
//       setPlayVideoId(data)
//       setPlayVideo(true)
//   }

//   const duration = (data?.runtime/60)?.toFixed(1)?.split(".")
//   const writer = castData?.crew?.filter(el => el?.job === "Writer")?.map(el => el?.name)?.join(", ")

//   console.log("data",data)
//   console.log("star cast",castData)
//   return (
//     <div>
//             <div className='w-full h-[280px] relative hidden lg:block'>
//                 <div className='w-full h-full'>
//                     <img src={imageURL+data?.backdrop_path} className='h-full w-full object-cover'/> 
//                 </div> 
//                 <div className='absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent'></div>    
//             </div>

//             <div className="container mx-auto px-3 py-13 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10">
//                 <div className="relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60">
//                      <img src={imageURL+data?.poster_path} className='h-80 w-60 object-cover rounded'/>
//                      <button onClick={() => handlePlayVideo(data)} className="  bg-white text-lg text-slate-800 mt-3 px-4 py-2
//                       rounded-xl bold w-full hover:bg-gradient-to-l from-orange-500
//                        to-red-500 hover:scale-103 transition-all">Xem phim</button>
//                 </div>

//                 <div>
//                     <h2 className='text-2xl lg:text-4xl font-bold text-white' >
//                       {data?.title || data?.name}</h2>
//                     <p className='text-neutral-400'>{data?.tagline}</p> 


//                     <div className="flex items-center gap-3">
//                           <p>Rating :  {Number(data?.vote_average).toFixed(1)}+ </p>
//                           <span>|</span>
//                           <p>
//                             View :{ Number(data?.vote_count)}
//                           </p>
//                           <span>|</span>
//                           <p>Duration :{duration[0]}h {duration[1]}m</p>
//                     </div>

//                     <Divider/>
//                     <div>
//                           <h3 className='text-xl font-bold text-white mb-1'>Overview</h3>
//                           <p>{data?.overview}</p>

//                           <Divider/>
//                           <div className='flex items-center gap-3 my-3 text-center'>
//                                 <p>
//                                   Status : {data?.status}
//                                 </p>
//                                 <span>|</span>
//                                 <p>
//                                   Release Date : {moment(data?.release_date).format("MMMM Do YYYY")}
//                                 </p>
//                                 <span>|</span>
//                                 <p>
//                                   Revenue : {Number(data?.revenue)}
//                                 </p>
//                           </div>
//                       <Divider/>
//                     </div>

//                     <div>
//                           <p><span className='text-white'>Director</span> : {castData?.crew[0]?.name}</p>

//                           <Divider/>
//                           <p>
//                             <span className='text-white'>Writer : {writer}</span>
//                           </p>
//                     </div>

//                     <Divider/>

//                     <h2 className='font-bold text-lg'>Cast :</h2>
//                     <div className='grid grid-cols-[repeat(auto-fit,96px)] gap-5 my-4'>
//                           {
//                             castData?.cast?.filter(el => el?.profile_path).map((starCast,index)=>{
//                               return(
//                                 <div>
//                                   <div>
//                                     <img
//                                         src={imageURL+starCast?.profile_path} className='w-24 h-24 object-cover rounded-full'/>
//                                   </div>
//                                   <p className='font-bold text-center text-sm text-neutral-400'>{starCast?.name}</p>
//                                 </div>
//                               )
//                             })
//                           }
//                     </div>
//                 </div>
//             </div>

//             <div>
//               <HorizontalScollCard data={similarData} heading={"Tương tự "+params?.explore} media_type={params?.explore}/>
//               <HorizontalScollCard data={recommendationData} heading={"Đề xuất "+params?.explore} media_type={params?.explore}/>
//             </div>

//             {
//               playVideo && (
//                 <VideoPlay data={playVideoId} close={()=>setPlayVideo(false)} media_type={params?.explore}/>
//               )
//             } 
//     </div>
//   )
// }

// export default DetailsPage



// Call API MOI
import { useParams } from "react-router-dom"
import useFetchDetails from "../hooks/useFetchDetails"
import useFetch from "../hooks/useFetch"
import Divider from "../components/Divider"
import HorizontalScollCard from '../components/HorizontalScollCard'
import { useState } from "react"
import VideoPlay from '../components/VideoPlay'
import { Link } from 'react-router-dom';

const DetailsPage = () => {
  // const imageURL = useSelector(state => state.dukemaxData.imageURL)
  const params = useParams()
  const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`)
  const { data: movieList } = useFetch("https://phimapi.com/v1/api/danh-sach/phim-le");
  const { data: seriesList } = useFetch("https://phimapi.com/v1/api/danh-sach/phim-bo");
  const [playVideo,setPlayVideo] = useState(false)
  const [playVideoId,setPlayVideoId] = useState("")

  const handlePlayVideo=(data)=>{
      setPlayVideoId(data)
      setPlayVideo(true)
  }

  console.log("data",data)
  return (
    <div>
            <div className='w-full h-[380px] relative hidden lg:block'>
                <div className='w-full h-full '>
                    <img src={data?.thumb_url} className='h-full w-full object-cover'/> 
                </div> 
                <div className='absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent'></div>    
            </div>
            <div className="container mx-auto px-3 py-13 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10">
                <div className="relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60">
                     <img src={data?.poster_url} className='h-80 w-60 object-cover rounded'/>
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
                              // onClick={() => handleWatchMovie(data)} 
                              className="bg-white text-lg text-slate-800 py-2 
                                          rounded-xl font-bold w-1/2 hover:bg-gradient-to-l  
                                        from-green-500 to-blue-500 hover:scale-103 
                                        transition-all">  
                                        <Link to={`/watch/${data?.slug}`}>Xem Phim</Link>
                        </button>
                      </div>
                </div>
                <div>
                    <h2 className='text-2xl lg:text-4xl font-bold text-white' >
                      {data?.title || data?.name}</h2>
                    <div className="flex items-center gap-3">
                          <p>Tình trạng:  {data?.episode_current} </p>
                          <span>|</span>
                          <p>
                            Năm phát hành: {data?.year}
                          </p>
                          <span>|</span>
                          <p>Thời lượng: {data?.time}</p>
                          <span>|</span>
                          <p>Chất lượng: {data?.quality}</p>
                    </div>
                    <Divider/>
                    <div>
                          <h3 className='text-2xl font-bold text-white mb-1'>Nội Dung</h3>
                          <p>{data?.content}</p>
                          <Divider/>
                          <div className='flex items-center gap-3 my-3 text-white text-center'>
                                <p>
                                  Status : {data?.status}
                                </p>
                                <span>|</span>
                                <p>
                                  Ngôn ngữ : {data?.lang}
                                </p>
                                <span>|</span>
                                <p>
                                  Số tập : {data?.episode_total}
                                </p>
                                <p>
                                  Quốc gia : {data?.country?.[0]?.name}
                                </p>
                                <span>|</span>
                                <p>
                                Thể loại: {data?.category?.map((item) => item.name).join(', ')}
                                </p>
                          </div>
                      <Divider/>
                    </div>
                    <div>
                          <p><span className='text-white'>Đạo diễn</span> : {data?.director}</p>
                          <Divider/>
                          <p>
                            <span className='text-white'>Diễn viên : {data?.actor?.join(", ")}</span>
                          </p>
                    </div>
                </div>
            </div>
            <div>
            <HorizontalScollCard data={movieList} heading={"Phim lẻ"} media_type={"movie"} />
            <HorizontalScollCard data={seriesList} heading={"Phim bộ"} media_type={"tv"} />
            </div>
            {
              playVideo && (
                <VideoPlay data={playVideoId} close={()=>setPlayVideo(false)} media_type={params?.explore}/>
              )
            } 
    </div>
  )
}

export default DetailsPage