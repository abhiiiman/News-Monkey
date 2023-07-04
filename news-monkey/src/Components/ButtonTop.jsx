import React from 'react';
import { useEffect, useState } from 'react';

const ButtonTop = () => {

    const [backToTopButton, setBackToTopButton] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                setBackToTopButton(true);
            }
            else {
                setBackToTopButton(false);
            }
        })
    }, [])

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }


    return (
        <div className="container text-center">
            {backToTopButton &&
                (<button className="topButton btn btn-dark my-3 text-center" onClick={scrollUp}>Top &uarr;</button>)}
        </div>
    )
}

export default ButtonTop;