import styles from "./HeroCard.module.scss";
import React, {useEffect} from "react";
import {IHero} from "../../api/models/hero/types/hero.types";
import {useNavigate} from "react-router-dom";
import {useDeleteHero} from "../../api/models/hero/delete.one";
import {setResErrGlobal} from "../../store/features/app.slice";
import {useAppDispatch, useAppSelector} from "../../store";

interface IHeroCard {
    hero: IHero
    callback: (search: string) => void
}

export const HeroCard: React.FC<IHeroCard> = ({hero, callback}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {loading: heroLoading, data: id, error: heroError, deleteHero} = useDeleteHero()


    useEffect(() => {
        if (heroError) dispatch(setResErrGlobal(heroError))
    }, [heroError])

    return (
        <div onClick={() => {
            navigate(`hero/${hero._id}`)
        }} className={styles.hero}>
            <div className={styles.hero__photoname}>{hero.nickname}</div>
            <div className={styles.hero__imgwrapper}>
                {hero.images?.length ? <img height={200} width={'auto'} src={hero.images[0]}
                                            alt=""/> : <img height={200} width={'auto'} src={'http://www.cbn.com/images7/superman-silhouette_SI.jpg'}
                                                            alt=""/>}

            </div>
            <button className={styles.hero__butt} disabled={heroLoading} onClick={async (e) => {
                e.stopPropagation()
                await deleteHero(hero._id)
                await callback('')
            }}>Delete
            </button>
        </div>
    )
}
