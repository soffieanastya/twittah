// npm i swr 
import useSWR from 'swr'
import fetcher from '@/library/fetcher'

const usePosts = (userId?: string) => {
    // swr untuk simpen data yang di fetch oleh fetcher supaya bisa diakses secara global
    const url = userId ? `/api/posts?userId=${userId}` : '/api/posts'
    const { data, error, isLoading, mutate } = useSWR( url, fetcher)    
    return { data, error, isLoading, mutate}
}

export default usePosts;