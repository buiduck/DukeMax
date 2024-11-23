import {useSelector} from 'react-redux'
import { FaAngleLeft,FaAngleRight } from "react-icons/fa";
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

const BannerHome = ({media_type}) => {
    const bannerData = useSelector(state => state.dukemaxData.bannerData)
    // const imageURL = useSelector(state => state.dukemaxData.imageURL)
    const [currentImage,setCurrentImage] = useState(0)

    const handleprevious =()=>{
        if(currentImage > 0){
            setCurrentImage(preve => preve - 1)
        }
    }
    const handleNext = () =>{
        if(currentImage < bannerData.length - 1){
            setCurrentImage(preve => preve + 1)
        }
    }
    useEffect(()=>{
        const interval = setInterval(()=>{
            if(currentImage < bannerData.length - 1){
                handleNext()
            }else{
                setCurrentImage(0)
            }
        },5000)

        return ()=>clearInterval(interval)
    },[bannerData,currentImage])

  return (
    <section className='h-full w-full'>
       <div className='flex min-h-full max-h-[95vh] overflow-hidden '>
                {bannerData.map((data,index)=>{
                    return (
                        <div key={data.id+"bannerHome"+index} className='min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all' 
                        style={{ transform : `translateX(-${currentImage * 100}%)`}}>
                            <div className='w-full h-full'>
                                <img src={data.thumb_url}  className='h-full w-full object-cover'/>
                            </div>

                                {/***button next and previous image */}
                                <div className='absolute top-0 w-full h-full hidden items-center justify-between px-4 group-hover:md2:flex'>
                                    <button onClick={handleprevious} className='bg-white  p-1 rounded-full  text-3xl z-10 text-black'>
                                        <FaAngleLeft/>
                                    </button>
                                    <button onClick={handleNext} className='bg-white p-1 rounded-full  text-3xl z-10 text-black '>
                                        <FaAngleRight/>
                                    </button>
                                </div>

                            <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent'>
                            </div>
                            <div className='container  mx-auto'>
                               <div className='w-full absolute bottom-20 max-w-md px-3'> 
                                    <h2 className='font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl '>{data?.name}</h2>
                                    <h2 className='font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl'>({data?.origin_name})</h2>
                                    {/* <p className='text-ellipsis line-clamp-3 my-2'>{data.overview}</p> */}
                                    <div className='flex items-center gap-5'>
                                        <p>Năm : {data.year}</p>
                                        <span>|</span>
                                        <p>View : Đang cập nhật</p>
                                    </div>
                                    <Link to={"/phim/"+data.slug}>
                                        <button  className=' bg-white px-4 py-2 text-black font-bold rounded mt-4  hover:bg-gradient-to-l from-orange-600 to-green-500 shadow-md transition-all hover:scale-105'>
                                                    Play Now
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div> 
    </section>
  )
}

export default BannerHome