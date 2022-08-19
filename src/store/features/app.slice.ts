import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IAppSlice {
    resErrGlobal: null | string
    resErrLocal: null | string

}

const initialState: IAppSlice = {
    resErrGlobal: null,
    resErrLocal: null
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setResErrGlobal: (state = initialState, action: PayloadAction<string | null>) => {
            state.resErrGlobal = action.payload
        },
        setResErrLocal: (state = initialState, action: PayloadAction<string | null>) => {
            state.resErrLocal = action.payload
        }
    }
})

export const {setResErrGlobal, setResErrLocal} = appSlice.actions



