// import { useLocation, useNavigate } from 'react-router-dom'
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Card from '../components/Card';

// const SearchPage = () => {
//   const location = useLocation();
//   const [data,setData] = useState([])
//   const [page,setPage] = useState(1)
//   const navigate = useNavigate()

//   const query = location?.search?.slice(3)

//   const fetchData = async()=>{
//     try {
//         const response = await axios.get(`search/multi`,{
//           params : {
//             query :location?.search?.slice(3),
//             page : page
//           }
//         })
//         setData((preve)=>{
//           return[
//               ...preve,
//               ...response.data.results
//           ]
//         })
//     } catch (error) {
//         console.log('error',error)
//     }
//   }

//   useEffect(()=>{
//     if(query){
//       setPage(1)
//       setData([])
//       fetchData()
//     }
//   },[location?.search])

//   const handleScroll = ()=>{
//     if((window.innerHeight + window.scrollY ) >= document.body.offsetHeight){
//       setPage(preve => preve + 1)
//     }
//   }

//   useEffect(()=>{
//     if(query){
//       fetchData()
//     }
//   },[page])

//   useEffect(()=>{
//     window.addEventListener('scroll',handleScroll)
// },[])


//     return (
//         <div className='py-8'>
//               <div className='lg:hidden my-2 mx-1 sticky top-[70px] z-30'>
//                   <input 
//                     type='text'
//                     placeholder='Tìm kiếm phim ở đây...'
//                     onChange={(e)=> navigate(`/search?q=${e.target.value}`)}
//                     value={query?.split("%20")?.join(" ")}
//                     className='px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900 '
//                   />
//               </div>
//               <div className='container mx-auto'>
//                   <h1 className='capitalize text-lg lg:text-xl font-bold my-3'>Kết quả tìm kiếm </h1>
//                   <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
//                   {
//                     data.map((searchData,index)=>{
//                         return(
//                           <Card data={searchData} key={searchData.id+"search"} media_type={searchData.media_type}/>
//                         )
//                       })
//                   }
//                   </div>
//               </div>
//         </div>
//     )
// }
// export default SearchPage;

// CALL API THEO LINK MOI
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";

const SearchPage = () => {
  const location = useLocation();
  const [data, setData] = useState([]); // Dữ liệu trả về từ API
  const [page, setPage] = useState(1); // Trang hiện tại
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("q"); // Lấy giá trị từ query string

  const fetchData = async () => {
    if (!query) return; // Nếu không có query thì không gọi API

    try {
      const response = await axios.get("/api/movie/search", {
        params: {
          query: query, // Gửi từ khóa tìm kiếm
          limit: 20, // Giới hạn kết quả trả về mỗi lần
        },
      });

      if (response.data) {
        setData(response.data.data || []); // Gán kết quả tìm kiếm
      } else {
        console.log("No results found");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Fetch dữ liệu khi query thay đổi
  useEffect(() => {
    if (query) {
      setPage(1); // Reset trang về 1
      fetchData(); // Gọi API
    }
  }, [query]);

  return (
      <div className="py-8">
        {/* Thanh tìm kiếm dành cho di động */}
        <div className="lg:hidden my-2 mx-1 sticky top-[70px] z-30">
          <input
              type="text"
              placeholder="Tìm kiếm phim ở đây..."
              onChange={(e) => navigate(`/search?q=${e.target.value}`)}
              value={query || ""}
              className="px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900"
          />
        </div>
        <div className="container mx-auto">
          <h1 className="capitalize text-lg lg:text-xl font-bold my-3">
            Kết quả tìm kiếm
          </h1>
          {/* Hiển thị danh sách kết quả tìm kiếm */}
          <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
            {data.length > 0 ? (
                data.map((item) => <Card data={item} key={item.Id} />)
            ) : (
                <p className="text-center text-gray-500">
                  Không tìm thấy kết quả phù hợp.
                </p>
            )}
          </div>
        </div>
      </div>
  );
};

export default SearchPage;
