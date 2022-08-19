import React, {useEffect} from 'react'
import * as yup from 'yup'
import {withFormik, FormikProps, FormikErrors, Form, Field} from 'formik'
import styles from './CreateForm.module.scss'
import {useCreateHero} from "../../api/models/hero/create.one";

interface FormValues {
    nickname: string;
    real_name: string;
    origin_description: string;
    superpowers: string;
    catch_phrase: string;
}

interface OtherProps {
    message: string,
    callback: (query:string) => Promise<void>

}

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
    const {touched, errors, isSubmitting, message, handleChange, resetForm, values, handleSubmit, callback} = props
    const {loading, data, error, setError, createHero} = useCreateHero()

    useEffect(()=>{
        if(data) resetForm()
    },[data])

    return (
        <div className={styles.form}>
            <Form>
                <h1>{message}</h1>
                {error ? <div style={{color: "red"}}>{error}</div> : null}
                {/* {formResponse ? <div className={styles.formik__text}>
                <h3>{formResponse}</h3>
                <h5>Go to <span style={{borderBottom: '1px solid white'}}>Create! </span>button!</h5>
            </div> : null}*/}
                <div className={styles.form__fields}>
                    <div>Nickname</div>
                    <Field type='name' name='nickname' placeholder={'nickname...'}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                               if(error) setError(null)
                               handleChange(e)
                           }}/>
                    {touched.nickname && errors.nickname && <div className={styles.form__err}>{errors.nickname}</div>}

                    <div>Real Name</div>
                    <Field type='name' name='real_name' placeholder={'real name...'}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                               handleChange(e)
                           }}/>
                    {touched.real_name && errors.real_name &&
                    <div className={styles.form__err}>{errors.real_name}</div>}

                    <div>Origin Description</div>
                    <Field as={'textarea'} type='name' name='origin_description' placeholder={'origin description...'}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                               handleChange(e)
                           }}/>
                    {touched.origin_description && errors.origin_description &&
                    <div className={styles.form__err}>{errors.origin_description}</div>}

                    <div>Superpowers</div>
                    <Field as={'textarea'} type='name' name='superpowers' placeholder={'superpowers...'}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                               handleChange(e)
                           }}/>
                    {touched.superpowers && errors.superpowers &&
                    <div className={styles.form__err}>{errors.superpowers}</div>}

                    <div>Catch Phrase</div>
                    <Field as={'textarea'} type='name' name='catch_phrase' placeholder={'catch phrase...'}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                               handleChange(e)
                           }}/>
                    {touched.catch_phrase && errors.catch_phrase &&
                    <div className={styles.form__err}>{errors.catch_phrase}</div>}

                </div>

                <button type='submit' disabled={isSubmitting} onClick={async () => {
                    if(Object.keys(errors).length === 0 && Object.keys(touched).length > 0){
                        await createHero(values)
                        await callback('')
                    }
                }}>
                    Submit
                </button>
            </Form>
        </div>
    )
}


interface MyFormProps {
    message: string;
    callback: (query:string) => Promise<void>
}


let schema = yup.object().shape({
    nickname: yup.string().required().min(6),
    real_name: yup.string().required().min(6),
    origin_description: yup.string().required().min(6),
    superpowers: yup.string().required().min(6),
    catch_phrase: yup.string().required().min(6),
})

export const CreateForm = withFormik<MyFormProps, FormValues>({

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
