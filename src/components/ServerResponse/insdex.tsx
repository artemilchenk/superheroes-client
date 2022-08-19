import styles from "./ServerError.module.scss";
import React from "react";

interface IServerError {
    message: string
}


export const ServerError: React.FC<IServerError> = ({message}) => {
    return (
        <div className={styles.response_error}>
            {message}
        </div>
    )

}
