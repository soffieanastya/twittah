// npm i swr 
import useSWR from 'swr'
import fetcher from '@/library/fetcher'

const usePost = (postId?: string) => {
    // swr untuk simpen data yang di fetch oleh fetcher supaya bisa diakses secara global
    const url = postId ? `/api/posts/${postId}` : null
    const { data, error, isLoading, mutate } = useSWR( url, fetcher)    
    return { data, error, isLoading, mutate}
}

export default usePost;