import {useState} from "react";
import axios, {AxiosError} from "axios";
import {Server} from "../../../server";
import {IUpdateHeroDto} from "./types/hero.types";

export function useUpdateHero() {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    async function updateHero(id:string, dto: IUpdateHeroDto) {
        try {
            setError(null)
            setLoading(true)
            const response = await axios.put(`${Server.url}hero/${id}`, {...dto})
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

    return {loading, data, error, updateHero}
}
