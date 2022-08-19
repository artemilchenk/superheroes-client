import React, {useEffect, useState} from 'react'
import * as yup from 'yup'
import {withFormik, FormikProps, FormikErrors, Form, Field} from 'formik'
import styles from "../../pages/HeroPage/HeroPage.module.scss";
import {IHero} from "../../api/models/hero/types/hero.types";
import {useUpdateHero} from "../../api/models/hero/update.one";


interface FormValues {
    real_name: string;
    origin_description: string;
    superpowers: string;
    catch_phrase: string;
}

interface OtherProps {
    message: string,
    hero: Partial<IHero>
    callback: (id:string)=> Promise<void>
}

interface ITouched {
    real_name: boolean
    origin_description: boolean
    superpowers: boolean
    catch_phrase: boolean
}

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
    const {touched, errors, isSubmitting, message, handleChange, values, hero, setValues, resetForm, callback} = props
    const {loading, data, error, updateHero} = useUpdateHero()
    const [editMode, setEditMode] = useState(false);
    const [touchedEdit, setTouchedEdit] = useState<Partial<ITouched>>({})

    useEffect(() => {
        setValues({
            real_name: hero.real_name || '',
            origin_description: hero.origin_description || '',
            superpowers: hero.superpowers || '',
            catch_phrase: hero.catch_phrase || '',
        })
    }, [editMode])

    return (
        <div className={styles.form}>
            <Form>
                <h1>{message}</h1>
                {error ? <div style={{color: "red"}}>{error}</div> : null}
                <div className={styles.form__fields}>
                    <div className={styles.heropage__heroinfo}>
                        <div>Real Name:</div>
                        {!editMode ? <div>{hero?.real_name}</div> : <div>
                            <Field value={!touchedEdit.real_name ? hero?.real_name : values.real_name} type='name'
                                   name='real_name' placeholder={'real name...'}
                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                       setTouchedEdit({...touchedEdit, real_name: true})
                                       setValues({...values, real_name: e.target.value})
                                       handleChange(e)
                                   }}/>
                        </div>}
                    </div>
                    {touched.real_name && errors.real_name &&
                    <div className={styles.heropage__err}>{errors.real_name}</div>}

                    <div className={styles.heropage__heroinfo}>
                        <div>Origin Description:</div>
                        {!editMode ? <div>{hero.origin_description}</div> : <div>
                            <Field
                                value={!touchedEdit.origin_description ? hero?.origin_description : values.origin_description}
                                as={'input'} type='name' name='origin_description'
                                placeholder={'origin description...'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setTouchedEdit({...touchedEdit, origin_description: true})
                                    handleChange(e)
                                }}/>
                        </div>}
                    </div>
                    {touched.origin_description && errors.origin_description &&
                    <div className={styles.heropage__err}>{errors.origin_description}</div>}


                    <div className={styles.heropage__heroinfo}>
                        <div>Superpowers:</div>
                        {!editMode ? <div>{hero.superpowers}</div> : <div>
                            <Field value={!touchedEdit.superpowers ? hero?.superpowers : values.superpowers}
                                   as={'input'}
                                   type='name' name='superpowers' placeholder={'superpowers...'}
                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                       setTouchedEdit({...touchedEdit, superpowers: true})
                                       handleChange(e)
                                   }}/>
                        </div>}
                    </div>
                    {touched.superpowers && errors.superpowers &&
                    <div className={styles.heropage__err}>{errors.superpowers}</div>}

                    <div className={styles.heropage__heroinfo}>
                        <div>Catch Phrase:</div>
                        {!editMode ? <div>{hero.catch_phrase}</div> : <div>
                            <Field value={!touchedEdit.catch_phrase ? hero?.catch_phrase : values.catch_phrase}
                                   as={'input'}
                                   type='name' name='catch_phrase' placeholder={'catch phrase...'}
                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                       setTouchedEdit({...touchedEdit, catch_phrase: true})
                                       handleChange(e)
                                   }}/>
                        </div>}
                    </div>
                    {touched.catch_phrase && errors.catch_phrase &&
                    <div className={styles.heropage__err}>{errors.catch_phrase}</div>}
                </div>

                {!editMode ? <button onClick={() => setEditMode(true)}>Edit</button> : (
                    <div>
                        <button type='submit' disabled={isSubmitting} onClick={async () => {
                            if (Object.keys(errors).length === 0) {
                                await updateHero(hero._id, values)
                                await callback(hero._id)
                                resetForm()
                                setEditMode(false)
                            }
                            setEditMode(false)
                        }}>
                            Submit
                        </button>

                        <button type='button' disabled={isSubmitting} onClick={async () => {
                            setEditMode(false)
                        }}>
                            Cancel
                        </button>
                    </div>

                )}
            </Form>
        </div>
    )
}


interface MyFormProps {
    message: string
    hero: Partial<IHero>
    callback: (id:string)=> Promise<void>
}


let schema = yup.object().shape({
    real_name: yup.string().required().min(6),
    origin_description: yup.string().required().min(6),
    superpowers: yup.string().required().min(6),
    catch_phrase: yup.string().required().min(6),
})

export const UpdateForm = withFormik<MyFormProps, FormValues>({

    mapPropsToValues: (props) => ({
        nickname: '',
        real_name: '',
        origin_description: '',
        superpowers: '',
        catch_phrase: '',

    }),

    validate: async (values: FormValues) => {
        let errors: FormikErrors<FormValues> = {}

        await schema
            .validate(values)
            .catch((error) => {
                let key: keyof FormValues = error.message.split(' ')[0]
                errors[key] = error.message
            })

        return errors
    },

    handleSubmit: async (values: FormValues) => {
    }


})(InnerForm)

