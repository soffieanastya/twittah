import FollowBar from "./layout/FollowBar";
import Sidebar from "./layout/Sidebar";


interface LayoutProps {
    children: React.ReactNode
}

const Layout:React.FC<LayoutProps> = ({ children }) => {
    return ( 
        <div className="h-screen bg-black">
            <div className="lg:container h-full mx-auto w-full ">
                <div className="grid grid-cols-9 h-full">
                    <Sidebar />
                    <div className="col-span-8 mx-2 lg:col-span-5 border-x-[1px]
                        border-neutral-800">
                        {children}
                    </div>
                    <FollowBar />
                </div>
            </div>
        </div>
     );
}
 
export default Layout;