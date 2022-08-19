import {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import {Server} from "../../../../server";
import {IHero} from "../types/hero.types";

export function useGetHero(id: string | undefined) {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<Partial<IHero>>({})
    const [error, setError] = useState<string | null>(null)

    async function getHero(heroId: string) {
        try {
            setError(null)
            setLoading(true)
            const response = await axios.get(`${Server.url}hero/${heroId}`)
            setData(response.data)
            setLoading(false)

        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.response) {
                    setError(err.message)
                    setLoading(false)
                }
            }
        }
    }

    useEffect(() => {
        getHero(id || '')
    }, [])

    return {loading, data, error, getHero}
}
