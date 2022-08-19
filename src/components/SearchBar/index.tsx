import styles from "./Search.module.scss";
import {BsSearch} from "@react-icons/all-files/bs/BsSearch";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";

export const SearchComponent = () => {
    const [searchParams, setSearchParams] = useSearchParams({});
    const [searchQuery, setSearchQuery] = useState(searchParams.get("searchQuery") || "");
    const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        clearTimeout(timer);
        if (searchQuery) {
            setTimer(setTimeout(() => {
                searchParams.set("searchQuery", searchQuery);
                setSearchParams(searchParams);
            }, 2000));
        } else {
            searchParams.delete("searchQuery");
            setSearchParams(searchParams);
        }
    }, [searchQuery]);


    return <div className={styles.search}>
        <input onChange={(e) => setSearchQuery(e.target.value)} className={styles.search__field} name="search"
               value={searchQuery}>
        </input>
        <BsSearch/>
    </div>;
};
