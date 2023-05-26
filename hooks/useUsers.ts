// npm i swr 
import useSWR from 'swr'
import fetcher from '@/library/fetcher'

const useUsers = () => {
    // swr untuk simpen data yang di fetch oleh fetcher supaya bisa diakses secara global

    const { data, error, isLoading, mutate } = useSWR('/api/users', fetcher)    
    return { data, error, isLoading, mutate}
}

export default useUsers;