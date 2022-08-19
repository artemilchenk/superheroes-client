import {useState} from "react";
import axios, {AxiosError} from "axios";
import {Server} from "../../../server";
import {IHero} from "./types/hero.types";

export function useCreateHero() {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    async function createHero(dto: IHero) {
        try {
            setError(null)
            setLoading(true)
            const response = await axios.post(`${Server.url}hero/create`, {...dto})
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

    return {loading, data, error, setError, createHero}
}
