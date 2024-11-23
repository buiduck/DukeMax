
import { IoClose } from "react-icons/io5";

const VideoPlay = ({close,data}) => {
  // const {data : videoData} = useFetchDetails(`/${media_type}/${data?.id}/videos`)
  return (
    <section className='fixed bg-neutral-700 top-0 right-0 bottom-0 left-0 z-40 bg-opacity-50 flex justify-center items-center'>
        <div className=" bg-black w-full h-[80vh] max-w-screen-lg aspect-video rounded relative">
          <button onClick={close} className=' absolute right-0 top-0 text-3xl z-50'>
              <IoClose/>
          </button>

          {/* <iframe
            src={`https://www.youtube.com/embed/${videoData?.results[0]?.key}`}
            className='w-full h-full'
          /> */}
          <iframe
          src={data?.trailer_url?.replace("watch?v=", "embed/")} // Chuyển đổi URL để nhúng YouTube
          className="w-full h-full"
          allowFullScreen
          title="Trailer"
        />

        </div>
    </section>
  )
}

export default VideoPlay