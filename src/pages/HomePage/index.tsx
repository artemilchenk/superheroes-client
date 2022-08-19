import {useAppDispatch} from "../../store";
import {useGetHeroes} from "../../api/models/hero/hook/getHeroesHook";
import {setResErrGlobal} from "../../store/features/app.slice";
import React, {useEffect} from "react";
import {HeroCard} from "../../components/HeroCard/insdex";
import styles from './HomePage.module.scss'
import {CreateForm} from "../../components/Form/Create";
import {SearchComponent} from "../../components/SearchBar";
import {useLocation, useSearchParams} from "react-router-dom";
import {PaginatorComponent} from "../../components/Paginator";

export const HomePage = () => {
    const [searchParams, setSearchParams] = useSearchParams({});
    const location = useLocation();
    const dispatch = useAppDispatch()
    const {loading: heroLoading, data, error: heroError, getHeroes} = useGetHeroes('', '')

    useEffect(() => {
        if (heroError) dispatch(setResErrGlobal(heroError))
    }, [heroError])

    useEffect(() => {
        getHeroes(location.search)
    }, [searchParams])

    return (
        <div className={styles.homepage}>
            <CreateForm callback={getHeroes} message={'Create Hero'}/>
            <SearchComponent/>
            <PaginatorComponent count={data?.count || 0}/>
            {data && data.heroes?.length ? (
                <div>
                    {data.heroes.map(he => <HeroCard key={he._id} callback={getHeroes} hero={he}/>)}
                </div>
            ) : null}
        </div>
    );
}
