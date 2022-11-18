import React, { useRef, useState } from 'react';
import style from './styles.module.css';

export const Form = ({ onSubmitHandler, error }) => {
    const [focused, setFocused] = useState(false);
    const inputSearch = useRef(null);

    const focusHandler = () => {
        setFocused((prev) => {
            if (prev === false) {
                return !prev;
            } else {
                return !prev;
            }
        });
    };

    return (
        <div className={style['container-form']}>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    onSubmitHandler(inputSearch.current.value);
                    inputSearch.current.value = '';
                    inputSearch.current.blur();
                }}
                className={
                    focused ? `${style.form} ${style.focused}` : style.form
                }
            >
                <input
                    ref={inputSearch}
                    className={style.search}
                    type="text"
                    placeholder="Search for a city"
                    onFocus={focusHandler}
                    onBlur={focusHandler}
                />
            </form>
        </div>
    );
};
