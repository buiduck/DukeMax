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

import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';

const SearchPage = () => {
  const location = useLocation();
  const [data, setData] = useState([]);  // Dữ liệu trả về từ API
  const [page, setPage] = useState(1);   // Trang hiện tại
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search).get('q');  // Lấy giá trị từ query string

  const fetchData = async () => {
    if (!query) return;  // Nếu không có query thì không gọi API

    try {
      const response = await axios.get('/v1/api/tim-kiem?keyword=', {
        params: {
          keyword: query,  // Sử dụng query string làm từ khóa tìm kiếm
          page: page
        }
      });

      // Kiểm tra nếu có kết quả và cập nhật dữ liệu
      if (response.data.status === 'success' && response.data.data.items) {
        setData(prev => [...prev, ...response.data.data.items]);
      } else {
        console.log('No results found');
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Lắng nghe sự thay đổi của query và tải lại dữ liệu
  useEffect(() => {
    if (query) {
      setPage(1);   // Đặt lại trang về 1 khi có query mới
      setData([]);  // Dọn dữ liệu cũ
      fetchData();  // Gọi API tìm kiếm
    }
  }, [query]);

  // Tải thêm dữ liệu khi thay đổi trang
  useEffect(() => {
    if (page > 1) {
      fetchData();  // Gọi lại API khi trang thay đổi
    }
  }, [page]);

  // Xử lý sự kiện cuộn trang để phân trang
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {  // Cách 100px để tải thêm dữ liệu
      setPage(prev => prev + 1);
    }
  };

  // Thêm và xóa sự kiện scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='py-8'>
      {/* Tìm kiếm di động */}
      <div className='lg:hidden my-2 mx-1 sticky top-[70px] z-30'>
        <input 
          type='text'
          placeholder='Tìm kiếm phim ở đây...'
          onChange={(e) => navigate(`/search?q=${e.target.value}`)}  // Thực hiện điều hướng khi người dùng nhập từ khóa
          value={query || ''}
          className='px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900 '
        />
      </div>
      <div className='container mx-auto'>
        <h1 className='capitalize text-lg lg:text-xl font-bold my-3'>Kết quả tìm kiếm</h1>
        {/* Hiển thị danh sách kết quả tìm kiếm */}
        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
          {data.map((searchData, index) => (
            <Card data={searchData} key={searchData.id + "search"}  /> // bo thu mediatype ("/" + mediaType + )
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
