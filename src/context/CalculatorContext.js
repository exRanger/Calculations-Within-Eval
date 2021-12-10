import {createContext} from 'react'

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

export function finalCalculation(str){
   
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

 
const CalculatorContext = createContext(finalCalculation)

export default CalculatorContext