// import { useParams } from "react-router-dom"
// import { useState,useEffect } from "react"
// import axios from "axios"
// import Card from "../components/Card"

// const ExplorePage = () => {
//   const params = useParams()
//   const [pageNo,setPageNo] = useState(1)
//   const [data,setData] = useState([])
//   const [totalPageNo,setTotalPageNo] = useState(0)
//   console.log("params",params.explore)

//   const fetchData = async()=>{
//     try {
//         const response = await axios.get(`/discover/${params.explore}`,{
//           params : {
//             page : pageNo
//             }
//         })
//         setData((preve)=>{
//           return[
//               ...preve,
//               ...response.data.results
//           ]
//         })
//         setTotalPageNo(response.data.total_pages)
//     } catch (error) {
//         console.log('Error',error)
//     }
//   }
//   const handleScroll =()=>{
//       if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
//           setPageNo(preve => preve + 1)
//         }
//   }

//   useEffect(()=>{
//     fetchData()
//   },[pageNo])

//   useEffect(()=>{
//     setPageNo(1)
//     setData([])
//     fetchData()
// },[params.explore])

//   useEffect(()=>{
//     window.addEventListener('scroll',handleScroll)
// },[])

  
//   return (
//     <div className="py-10">
//         <div className=" container mx-auto">
//             <h3 className='capitalize text-lg lg:text-2xl font-bold my-3'>Show {params.explore} phổ biển</h3>

//             <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
//                 {
//                   data.map((exploreData,index)=>{
//                       return(
//                         <Card data={exploreData} key={exploreData.id+"exploreSEction"} media_type={params.explore}/>
//                       )
//                     })
//                 }
//             </div>
//         </div>
//     </div>
//   )
// }

// export default ExplorePage

// CALL API THEO LINK MOI
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";

const ExplorePage = () => {
  const params = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState([]);
  const [totalPageNo, setTotalPageNo] = useState(0);
  const [loading, setLoading] = useState(false);

  // Xác định URL API dựa trên params.explore
  const apiURL =
    params.explore === "movie"
      ? "/v1/api/danh-sach/phim-le"
      : "/v1/api/danh-sach/tv-shows";

  // Hàm fetch dữ liệu
  const fetchData = async () => {
    if (loading) return; // Không gọi API nếu đang tải dữ liệu

    setLoading(true); // Bắt đầu loading

    try {
      const response = await axios.get(apiURL, {
        params: {
          page: pageNo,
          limit: 36,
        },
      });

      setData(response.data.data.items); // Lấy 'items' từ response
      setTotalPageNo(response.data.data.params.pagination?.totalPages || 0); // Lấy totalPages nếu có
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  // Fetch dữ liệu khi thay đổi page
  useEffect(() => {
    fetchData();
  }, [pageNo]);

  // Reset dữ liệu khi params.explore thay đổi
  useEffect(() => {
    setPageNo(1);
    setData([]); // Reset data khi đổi trang
  }, [params.explore]);

  // Hàm render phân trang
  const renderPagination = () => {
    const pages = [];
    const startPage = Math.max(1, pageNo - 3); // Hiển thị trang bắt đầu từ 3 trang trước trang hiện tại (nếu có)
    const endPage = Math.min(totalPageNo, startPage + 6); // Hiển thị tối đa 7 trang

    // Render các nút phân trang
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setPageNo(i)}
          className={`px-4 py-2 rounded-lg mx-1 ${
            i === pageNo
              ? "bg-blue-500 text-white"
              : "bg-gray-300 hover:bg-blue-500 text-gray-800"
          }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="py-10">
      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-2xl font-bold my-3">
          {params.explore === "movie" ? "Phim Chiếu rạp" : "TV Shows"} phổ biến
        </h3>

        {/* Hiển thị dữ liệu */}
        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
          {data.map((item) => (
            <Card
              data={item}
              key={item.id + "exploreSection"}
              // media_type={params.explore} Bo thu media type
            />
          ))}
        </div>

        {/* Hiển thị loading khi đang tải dữ liệu */}
        {loading && (
          <div className="flex justify-center mt-8">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        )}

        {/* Hiển thị phân trang */}
        <div className="flex justify-center mt-8">
          {renderPagination()}
        </div>

        {/* Nếu không còn trang nào để load */}
        {pageNo >= totalPageNo && !loading && (
          <div className="text-center text-gray-500 mt-6">
            Không còn dữ liệu để hiển thị.
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
