import {MdLocalMovies,MdLiveTv,MdHome,MdOutlineSearch,MdDescription,MdFilterAlt} from "react-icons/md";
export const navigation =[
    {
        label:"Truyền Hình Tv",
        href: 'tv',
        icon :<MdLiveTv/>
    },
    {
        label:"Phim Chiếu Rạp",
        href: 'movie',
        icon :<MdLocalMovies/>
    },
    {
        label: "Tin Tức",  
        href: 'blog',
        icon: <MdDescription />  
    },
    {
        label: "Lọc Phim",  
        href: 'mutliselect',
        icon: <MdFilterAlt />  
    }
]
 export const mobileNavigation = [
    {
        label:'Trang Trủ',
        href:'/',
        icon : <MdHome/>
    },
    ...navigation,
    {
        label:"Tìm Kiếm",
        href :'/search',
        icon :<MdOutlineSearch/>
    }
 ]