// npm i swr 
import useSWR from 'swr'
import fetcher from '@/library/fetcher'

const useUser = (userId: string) => {
    // swr untuk simpen data yang di fetch oleh fetcher supaya bisa diakses secara global

    const { data, error, isLoading, mutate } = useSWR( userId ? `/api/users/${userId}` : null, fetcher)    
    return { data, error, isLoading, mutate}
}

export default useUser;