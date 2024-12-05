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

  const movieURL = `/api/movie/filter?type=single&pageNumber=${pageNo}&pageSize=36`;
  const seriesURL = `/api/movie/filter?type=tvshows&pageNumber=${pageNo}&pageSize=36`;

  const fetchData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axios.get(
          params.explore === "movie" ? movieURL : seriesURL
      );

      if (response.data) {
        const { data: movies } = response.data; // Lấy dữ liệu và tổng số trang
        setData(movies.pageData || []); // Gán dữ liệu phim
        setTotalPageNo(movies.totalPages || 0); // Gán tổng số trang
        console.log("Fetched Data:", movies.pageData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNo]);

  useEffect(() => {
    setPageNo(1);
    setData([]);
  }, [params.explore]);

  const renderPagination = () => {
    if (totalPageNo <= 1) return null;

    const pages = [];
    const startPage = Math.max(1, pageNo - 3);
    const endPage = Math.min(totalPageNo, startPage + 6);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
          <button
              key={i}
              onClick={() => setPageNo(i)}
              className={`px-4 py-2 rounded-md mx-1 ${
                  i === pageNo
                      ? "bg-blue-500 text-white font-bold"
                      : "bg-gray-200 hover:bg-blue-500 hover:text-white text-gray-800"
              }`}
          >
            {i}
          </button>
      );
    }

    return (
        <div className="flex justify-center text-slate-700 space-x-2 mt-8">
          <button
              disabled={pageNo === 1}
              onClick={() => setPageNo((prev) => Math.max(prev - 1, 1))}
              className={`px-4 py-2 rounded-md ${
                  pageNo === 1
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gray-200 hover:bg-blue-500 hover:text-white"
              }`}
          >
            Trước
          </button>
          {pages}
          <button
              disabled={pageNo === totalPageNo}
              onClick={() => setPageNo((prev) => Math.min(prev + 1, totalPageNo))}
              className={`px-4 py-2 rounded-md ${
                  pageNo === totalPageNo
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gray-200 hover:bg-blue-500 hover:text-white"
              }`}
          >
            Tiếp
          </button>
        </div>
    );
  };

  return (
      <div className="py-10">
        <div className="container mx-auto">
          <h3 className="capitalize text-lg lg:text-2xl font-bold my-3">
            {params.explore === "movie" ? "Phim Lẻ" : "TV Shows"} phổ biến
          </h3>

          <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
            {data.length > 0 ? (
                data.map((item) => (
                    <Card
                        data={item}
                        key={item.Id || item.Slug || Math.random()} // Key duy nhất
                    />
                ))
            ) : loading ? (
                <div className="text-center text-gray-500">Đang tải dữ liệu...</div>
            ) : (
                <div className="text-center text-gray-500">Không có dữ liệu để hiển thị</div>
            )}
          </div>

          {loading && (
              <div className="flex justify-center mt-8">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
              </div>
          )}

          {renderPagination()}

          {pageNo >= totalPageNo && !loading && totalPageNo > 0 && (
              <div className="text-center text-gray-500 mt-6">
                Không còn dữ liệu để hiển thị.
              </div>
          )}
        </div>
      </div>
  );
};

export default ExplorePage;
