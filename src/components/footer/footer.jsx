import React from 'react'

// CSS
import './footer-styles.css'

const Footer = () => {

    const getYear = new Date().getFullYear()

    return (
        <footer>
            <p> Copyright &copy; Hotel-Lorem {getYear} </p>
        </footer>
    )
}

export default Footer