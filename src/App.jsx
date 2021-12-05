import React from 'react'
import Calculator from './components/Calculator'


export default  function App() {
    return (
        <div className="wrapper">
        <header className="header">
            <h1 className="header__title">Task by I-novus</h1>
        </header>
       <Calculator/>
        </div>
    )
}