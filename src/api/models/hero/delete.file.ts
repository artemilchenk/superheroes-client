import {useState} from "react";
import axios, {AxiosError} from "axios";
import {Server} from '../../../server';

export function useDeleteFileHero() {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    async function deleteFIle(id:string | undefined, fileName: string) {
        console.log(fileName)
        try {
            setError(null)
            setLoading(true)
            const response = await axios.post(`${Server.url}hero/delete/${id}`, {fileName})
            setData(response.data)
            setLoading(false)

        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.response) {
                    setError(err.response?.data?.message)
                    setLoading(false)
                }
            }
        }
    }

    return {loading, data, error, deleteFIle}
}
