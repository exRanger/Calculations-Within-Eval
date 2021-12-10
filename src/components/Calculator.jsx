import React, {useContext, useState} from 'react'
import Display from './Display'
import Button from './Button'
import '../sass/components/calculator.scss'
import CalculatorContext from '../context/CalculatorContext'

const Calculator = () => {

    const finalCalculation = useContext(CalculatorContext)
    
    let [value, setValue] = useState(null) // 

    const numbers = ['1','2','3','4','5','6','7','8', '9'] 

    const handleClick = (e) => {

        console.log('actions')
        let {target} = e
        let contains = target.parentNode.classList.contains.bind(target.parentNode.classList)
        if(contains('buttons_button')) return;

        if(contains('buttons__numbers') || contains('buttons__operators')){
    
            if(value){
                setValue(prevValue => prevValue + target.textContent)
            }else 
                setValue(target.textContent)

        }else if(target.classList.contains('buttons__button-equal')){
             
            setValue(finalCalculation(value))
        
        }else if(target.classList.contains('buttons__button-reset')){

            setValue('')

        }else if(target.classList.contains('buttons__button-backspace')){

            setValue(value.slice(0, value.length-1))
        }
    }
    
    return (
        <div className="calculator">
        <Display value={value}/>
        <div onClick={handleClick} className="calculator__buttons buttons">
            <div className="buttons__operators">
                <button className="buttons__button buttons_button-plus">+</button>
                <button className="buttons__button">-</button>
                <button className="buttons__button">/</button>
                <button className="buttons__button">*</button>
            </div>
            <div className="buttons__numbers">   
                {numbers.map((item,index) => {
                    return <Button onClick={handleClick} key={`item_${index}`} className='buttons__button' value={item}/> 
                })}                 
                <Button  className='buttons__button' value={'('}/>
                <Button className='buttons__button' value={'0'}/>
                <Button className='buttons__button' value={')'}/>    
            </div>
            <div className="buttons__tools">
                <button className="buttons__button buttons__button-reset">C</button>
                <button className="buttons__button buttons__button-backspace">&larr;</button>
                <button className="buttons__button buttons__button-equal">=</button>
            </div>
        </div>
    </div>
    )
}

export default Calculator
