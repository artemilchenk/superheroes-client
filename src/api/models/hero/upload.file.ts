import {useState} from "react";
import axios, {AxiosError} from "axios";
import {Server} from "../../../server";

export function useUploadFileHero() {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    async function uploadFIle(id:string | undefined, file: File) {
        try {
            setError(null)
            setLoading(true)
            const response = await axios.post(`${Server.url}hero/upload/${id}`, {file}, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
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

    return {loading, data, error, setError, uploadFIle}
}
