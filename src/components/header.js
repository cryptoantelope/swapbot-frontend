import React from 'react'
import {Link} from "react-router-dom"

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link to="/" className="navbar-brand">CryptoAntelope</Link>
            </div>
        </nav>
    )
}

export default Header