import styles from "./HeroPage.module.scss";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store";
import {useGetHero} from "../../api/models/hero/hook/getHeroHook";
import {useUpdateHero} from "../../api/models/hero/update.one";
import {setResErrGlobal, setResErrLocal} from "../../store/features/app.slice";
import {UpdateForm} from "../../components/Form/Update";
import {useUploadFileHero} from "../../api/models/hero/upload.file";
import {useDeleteFileHero} from "../../api/models/hero/delete.file";


export const HeroPage = () => {
    const {id} = useParams()
    const dispatch = useAppDispatch()
    const {data: hero, error: heroError, getHero} = useGetHero(id)
    const {error} = useUpdateHero()
    const {loading: loadingUploadFile, data: file, error: errorUploadFile, uploadFIle} = useUploadFileHero()
    const [fileImage, setFileImage] = useState<File | null>(null)
    const heroErrorLocal = useAppSelector(state => state.app.resErrLocal)
    const {deleteFIle} = useDeleteFileHero()
    console.log(errorUploadFile)

    useEffect(() => {
        if (heroError) dispatch(setResErrGlobal(heroError))
        if (error) dispatch(setResErrGlobal(error))
        if (errorUploadFile) dispatch(setResErrLocal(errorUploadFile))
    }, [heroError, error, errorUploadFile])

    return (
        <div className={styles.heropage}>
            <div className={styles.heropage__photoname}>{hero?.nickname}</div>
            <div className={styles.heropage__avatarwrapper}>
                {hero?.images?.length ? <img width={'auto'} height={'300px'} src={hero?.images[0] || ''} alt=""/> :
                    <img width={'400px'} height={'auto'} src={'http://www.cbn.com/images7/superman-silhouette_SI.jpg'}
                         alt=""/>}
            </div>


            <UpdateForm callback={getHero} hero={hero} message={''}/>

            <div className={styles.heropage__heroinfo}>
                <div>Images: <input onChange={async (e) => {
                    if (e.target.files && e.target.files.length) {
                        setFileImage(e.target.files[0])
                        dispatch(setResErrLocal(null))
                    }
                }} type="file"/></div>
            </div>

            {/*-------upload-input-------*/}
            {heroErrorLocal ? <div
                style={{color: "red"}}>{`${errorUploadFile} ${!errorUploadFile?.includes('jpeg') ? 'bytes' : ''}`}</div> : null}

            {fileImage && <button onClick={async () => {
                await uploadFIle(id || '', fileImage)
                setFileImage(null)
                await getHero(id || '')
            }} disabled={loadingUploadFile}>Upload</button>}


            {/*-------images-------*/}
            <div className={styles.heropage__heroinfo_flexwrap}>
                {hero?.images?.length ? hero.images.map(imgUrl => {
                        const filename = imgUrl.split('/')[imgUrl.split('/').length - 1].split('.')[0]
                        return (
                            <div>
                                <div className={styles.heropage__imgwrapper}>
                                    <img height={200} width={'auto'} src={imgUrl || ''}
                                         alt=""/>
                                    <button onClick={async () => {
                                        await deleteFIle(id || '', filename)
                                        await getHero(id || '')
                                    }}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )
                    }
                ) : null
                }
            </div>

        </div>
    )
}

