import {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import {Server} from "../../../../server";
import {IHeroesResponse} from "../types/hero.types";

export function useGetHeroes(request: string, query: string) {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<IHeroesResponse | null>(null)
    const [error, setError] = useState<string | null>(null)

    async function getHeroes(search: string) {
        try {
            setError(null)
            setLoading(true)
            const response = await axios.get(`${Server.url}hero/query/${search}`)
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
        getHeroes(query || '')
    }, [request, query])

    return {loading, data, error, getHeroes}
}
