// npm i swr 
import useSWR from 'swr'
import fetcher from '@/library/fetcher'

const useCurrentUser = () => {
    // swr untuk simpen data yang di fetch oleh fetcher supaya bisa diakses secara global

    const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher)    
    return { data, error, isLoading, mutate}
}

export default useCurrentUser;