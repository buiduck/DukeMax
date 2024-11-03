import {MdLocalMovies,MdLiveTv,MdHome,MdOutlineSearch} from "react-icons/md";
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