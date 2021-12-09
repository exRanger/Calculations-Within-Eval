import React from 'react'
import '../sass/components/button.scss'

const Button = ({value, className}) => {
    return (
        <button class={className}>{value}</button>
    )
}

export default Button
