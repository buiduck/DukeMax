import { NavLink ,Link,useNavigate, useLocation} from 'react-router-dom'
import logo1 from '../assets/logo.png'
import user from '../assets/user.png'
import { MdOutlineSearch } from "react-icons/md";
import { useEffect, useState } from 'react';
import { navigation } from '../constants/navigation';


const Header = () => {
    const location = useLocation();
    const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ")
    const [searchInput,setSearchInput] = useState(removeSpace)
    const navigate = useNavigate();  

    useEffect(() => {
        if(searchInput){
            navigate(`/search?q=${searchInput}`)
        }
    },[searchInput])

    const handleSubmit =(e) => {
        e.preventDefault();
    }
  return (
    <header className="fixed flex top- w-full h-16 bg-slate-500 bg-opacity-40 z-40">
        <div className="container mt-8 mx-auto px-2 flex items-center ml-10 " >
             <Link>
                <img  src={logo1} alt='logo' width={145} className='-ml-13 -mt-9'></img>
             </Link>
            <nav className='hidden lg:flex items-center mb-7 gap-3 ml-5'  >
                    {
                        navigation.map((nav,index)=>{
                            return (
                                <div>
                                    <NavLink key={nav.label} to={nav.href} className={'px-2 hover:text-neutral-400'}>
                                        {nav.label}
                                    </NavLink>
                                </div>
                            )
                        })
                    }
            </nav>
            <div className='ml-auto flex gap-6 '>
                <form className='flex items-center gap-2' onSubmit={handleSubmit}>
                    <input type='text'placeholder='Tìm kiểm phim ở đây...' onChange={(e)=>setSearchInput(e.target.value)}
                    value={searchInput}
                     className='bg-transparent -mt-8 px-4 py-1 outline-none border-b-2 hidden lg:block'>
                    </input>
                    <button className='-mt-8 w-7 text-3xl text-gray-200'>
                    <MdOutlineSearch/>
                    </button>
                </form>
                <div className='w-10 mb-9 rounded-full overflow-hidden cursor-pointer active:scale-50 transition-all'>
                    <img  src={user} width='w-ful h-full' />
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header