import axios from "axios"
import { useCallback, useMemo } from "react"
import toast from "react-hot-toast"
import useCurrentUser from "./useCurrentUser"
import useLoginModal from "./useLogionModal"
import useUser from "./useUser"

const useFollow = (userId: string) => {
    const { data: currentUser, mutate: mutateCurrentUser} = useCurrentUser()
    const { mutate: mutateFetchedUser} = useUser(userId)

    const loginModal = useLoginModal()

    const isFollowing = useMemo(()=>{
        const list = currentUser?.followingIds || []
        return list.includes(userId)
    },[userId, currentUser?.followingIds])

    const toggleFollow = useCallback( async () => {
        if(currentUser.id === ''){
            return loginModal.onOpen()
        }
        try{
            let request;
            if(isFollowing){
                request = () => axios.delete('/api/follow', { params: { userId }})
                toast.success("Unfollowed")
            }else{
                request = () => axios.post('/api/follow', { userId })
                toast.success("Following")
            }

            await request()

            //
            mutateCurrentUser()
            mutateFetchedUser()

            
        }catch(err){
            console.log(err);
            toast.error('Something went wrong')
        }
      },[currentUser, isFollowing, userId, mutateCurrentUser, mutateFetchedUser, loginModal],
    )
    
    return { isFollowing, toggleFollow}

}

export default useFollow;