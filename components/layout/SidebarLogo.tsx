import { useRouter } from "next/router";
import { BsTwitter } from "react-icons/bs";

const SidebarLogo = () => {
    const router = useRouter()
    return ( 
    <>
        <div className="mb-4 mx-3 pt-6 cursor-pointer">
          <div onClick={ ()=> router.push('/') } className='lg:flex  lg:space-x-4' >
            <BsTwitter size={26} color='cyan' />
            <p className="text-white font-bold text-xl items-center hidden lg:block">Twittah</p>
          </div>  
        </div>
    </>
     );
}
 
export default SidebarLogo;