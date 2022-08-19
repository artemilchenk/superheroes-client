import {useState} from "react";
import axios, {AxiosError} from "axios";
import {Server} from "../../../server";

export function useDeleteHero() {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    async function deleteHero(heroId: string) {
        try {
            setError(null)
            setLoading(true)
            const response = await axios.delete(`${Server.url}hero/${heroId}`)
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

    return {loading, data, error, deleteHero}
}
