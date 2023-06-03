import { BsHouseFill, BsBellFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'
import SidebarItem from './SidebarItem';
import SidebarLogo from './SidebarLogo';
import SidebarTweetButton from './SidebarTweetButton';
import useCurrentUser from '@/hooks/useCurrentUser';
import { signOut, useSession } from 'next-auth/react';

const Sidebar = () => {
    const { data: currentUser } = useCurrentUser()
    const items = [
        {
            label: 'Home',
            href: '/',
            icon: BsHouseFill
        },
        {
            label: 'Notifications',
            href: '/notifications',
            icon: BsBellFill,
            auth: true,
            alert: currentUser?.hasNotification
        },
        {
            label: 'Profile',
            href: `/users/${currentUser?.id}`,
            icon: FaUser,
            auth: true
        },
    ]
    // console.log(currentUser);
    
    // const { data: session } = useSession()
    // const handleSignOut = async () => {
    //     await signOut({ redirect: false })
    // }
 
    
    return ( 
        <div className='mx-2 col-span-1 lg:col-span-2 h-full '>
            <div className=' items-end sticky top-0 '>
                <div className='lg:space-y-1'>
                  <>
                    <SidebarLogo />
                    {items.map( (item) => (
                            <SidebarItem
                                key={item.href}
                                href={item.href}
                                label={item.label}
                                icon={item.icon}
                                auth={item.auth}
                                alert={item.alert}
                            />
                    ))}
                    {currentUser && currentUser.id !== '' ? (
                        <SidebarItem onClick={signOut} icon={BiLogOut} label="Logout" />
                    ) : null
                    }
                    <SidebarTweetButton />
                  </>
                </div>
            </div> 
        </div>
     );
}
 
export default Sidebar;