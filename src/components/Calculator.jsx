import React, {useState} from 'react'
import Display from './Display'
import Button from './Button'
import '../sass/components/calculator.scss'

function mathOperation(operation, arr){

    let firstIndex = operation-1;
    let secondIndex = operation+1;

    switch(arr[operation]){
            
        case '*':
            arr[firstIndex] = parseFloat(arr[firstIndex]) * parseFloat(arr[secondIndex]);
            break;

        case '/':
            arr[firstIndex] = parseFloat(arr[firstIndex]) / parseFloat(arr[secondIndex]);
            break;
        case '+':
            arr[firstIndex] = parseFloat(arr[firstIndex]) + parseFloat(arr[secondIndex]);
            break;
        case '-':
            arr[firstIndex] = parseFloat(arr[firstIndex]) - parseFloat(arr[secondIndex]);
            break;
    }

    arr[operation] = false;
    arr[secondIndex] = false;

    return transform(arr);

}

function transform(arr){
    let tranformArr = [];
    for(let k = 0; k < arr.length; k++){
        if(arr[k] !== false) tranformArr.push(arr[k]);
    }
    return tranformArr;
}

function calculate(string){
    let arr_c = (string.match(/([0-9]+)|\+|-|\*|\//g));
    let i = -1;

    if(!arr_c || arr_c.length == 1) return string;

    while(i++ < arr_c.length - 1){
        if(arr_c[i] == '*'){
            arr_c = mathOperation(i, arr_c);
            i = i-1;
        }
    }

    i = -1;
    while(i++ < arr_c.length - 1){
        if(arr_c[i] == '/'){
            arr_c = mathOperation(i, arr_c);
            i--;
    }
}

i = -1;
while(i++ < arr_c.length - 1){

    if(arr_c[i] == '+'){
        arr_c = mathOperation(i, arr_c);
        i--;
    }

    if(arr_c[i] == '-'){
        arr_c = mathOperation(i, arr_c);
        i--;
    }

}

return arr_c[0];

}

function finalCalculation(str){
   
    let result = str 
    let subCalculations = str.match(/\(([^()]+)\)/gmi)
    let insideCalc

    if(!subCalculations){
        return calculate(str) 
    }

    for(let k = 0; k < subCalculations.length; k++){
        insideCalc = subCalculations[k].replace(/\(|\)/g, '');
        result = result.replace('('+insideCalc+')', calculate(insideCalc));
    }

    if(result.indexOf('(') >= 0)
    return finalCalculation(result);

    return calculate(result);

} 

const Calculator = () => {

    let [value, setValue] = useState(null) // 

    const operators = ['+','-', '/', '*']
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
                    return <Button onClick={handleClick} key={`item${index}`} className='buttons__button' value={item}/> 
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
