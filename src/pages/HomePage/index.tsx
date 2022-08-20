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
import {Circles} from "react-loader-spinner";

export const HomePage = () => {
    const [searchParams, setSearchParams] = useSearchParams({});
    const location = useLocation();
    const dispatch = useAppDispatch()
    const {loading: heroesLoading, data, error: heroError, getHeroes} = useGetHeroes('', '')

    useEffect(() => {
        if (heroError) dispatch(setResErrGlobal(heroError))
        getHeroes(location.search)
    }, [searchParams, heroError])

    return (
        <div className={styles.homepage}>
            <CreateForm callback={getHeroes} message={'Create Hero'}/>
            <SearchComponent/>
            <PaginatorComponent count={data?.count || 0}/>
            {heroesLoading ? <Circles wrapperClass={styles.homepage__spiner} color="#00BFFF" height={80} width={80}/> : null}
            {data && data.heroes?.length ? (
                <div>
                    {data.heroes.map(he => <HeroCard key={he._id} callback={getHeroes} hero={he}/>)}
                </div>
            ) : null}
        </div>
    );
}
