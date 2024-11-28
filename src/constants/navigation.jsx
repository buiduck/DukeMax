import {MdLocalMovies,MdLiveTv,MdHome,MdOutlineSearch,MdDescription} from "react-icons/md";
export const navigation =[
    {
        label:"Truyền hình tv",
        href: 'tv',
        icon :<MdLiveTv/>
    },
    {
        label:"Phim chiếu rạp",
        href: 'movie',
        icon :<MdLocalMovies/>
    },
    {
        label: "Tin tức",  // Thêm mục "Blog"
        href: 'blog',
        icon: <MdDescription />  // Bạn có thể chọn icon phù hợp
    }
]
 export const mobileNavigation = [
    {
        label:'Trang trủ',
        href:'/',
        icon : <MdHome/>
    },
    ...navigation,
    {
        label:"Tìm kiếm",
        href :'/search',
        icon :<MdOutlineSearch/>
    }
 ]