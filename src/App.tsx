import React from 'react';
import './App.module.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/HomePage";
import {ServerError} from "./components/ServerResponse/insdex";
import {useAppSelector} from "./store";
import styles from "./App.module.scss";
import {HeroPage} from "./pages/HeroPage";

function App() {
    const heroError = useAppSelector(state => state.app.resErrGlobal)

    return (
        <div className={styles.app}>
            {heroError && <ServerError message={heroError}/>}
            <BrowserRouter>
                <Routes>
                    <Route path="/hero/:id" element={<HeroPage/>}/>
                    <Route index element={<HomePage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;

