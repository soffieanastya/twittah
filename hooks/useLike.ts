import axios from "axios"
import { request } from "http"
import { useCallback, useMemo } from "react"
import toast from "react-hot-toast"
import useCurrentUser from "./useCurrentUser"
import useLoginModal from "./useLogionModal"
import usePost from "./usePost"
import usePosts from "./usePosts"

const useLike = ({ postId, userId}: {postId:string, userId?: string})=>{
    const { data: currentUser } = useCurrentUser()
    const { data: fetchedPost, mutate: mutateFetchedPost  } = usePost(postId)
    const { mutate: mutateFetchedPosts } = usePosts(userId)

    const loginModal = useLoginModal()

    const hasLiked = useMemo(()=>{
        const list = fetchedPost?.likedIds || []
        return list.includes(currentUser?.id)
    },[currentUser?.id, fetchedPost?.likedIds])

    const togglelike = useCallback(async()=>{
        if(currentUser.id === ''){
            return loginModal.onOpen();
        }
        try{
            let request;
            if(hasLiked){
                request = () => axios.delete('/api/like', { params: { postId }});
                toast.success('Unliked')
            }else{
                request = () => axios.post('/api/like', { postId })
                toast.success('Liked')
            }

            await request();
            mutateFetchedPost()
            mutateFetchedPosts()

        }catch(err){
            toast.error("Something went wrong")
        }
    },[currentUser, hasLiked, postId, mutateFetchedPost, mutateFetchedPosts, loginModal])

    return { hasLiked, togglelike }
}

export default useLike;