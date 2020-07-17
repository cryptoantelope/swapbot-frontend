import React from 'react'

const Footer = () => {
    return <footer className="container" style={styles.container}>
        <p>made with <i className="fas fa-heart" style={styles.heart}></i> on <a href="https://brave.com/ijc003" target="_blank" rel="noopener noreferrer">brave browser</a></p>
        <p>Contact us on <a href="https://wolf.bet?c=antelope" rel="noopener noreferrer">wolf.bet</a> PM or <a href="https://twitter.com/cryptoAntelope"><i className="fab fa-twitter"></i></a></p>
    </footer>
}

const styles = {
    container: {
        padding: '.6rem 0',
        textAlign: 'center'
    },
    heart: {
        color: '#e25555'
    }
}

export default Footer