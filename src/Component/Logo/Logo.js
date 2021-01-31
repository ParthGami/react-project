import React from 'react'
import imgLogo from '../../assets/Images/burger-logo.png'
import classes from './Logo.css'
const logo = () => (
    <div className={classes.Logo}>
        <img src={imgLogo} alt='MyBurger'></img>
    </div>
)

export default logo