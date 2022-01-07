const {log} = console
 
class Calculator {
    constructor(button){
        this.button = button
        this.button.addEventListener('click', this.clickButton)  
    }

    clickButton = (e) => {

        let {target} = e
	
        let querySelector = document.body.querySelector.bind(document.body)
        let contains = target.parentNode.classList.contains.bind(target.parentNode.classList)

        if(contains('buttons_button')) return;

        if(contains('buttons__numbers') || contains('buttons__operators')){         
            querySelector('.calculator__output').textContent = ''
            querySelector('.calculator__output').value += target.innerHTML
        }

        if(contains('buttons__button-equal')){
             
            querySelector('.calculator__output').value = this.finalCalculation(querySelector('.calculator__output').value)
        
        }else if(contains('buttons__button-reset')){

            querySelector('.calculator__output').value = ''

        }else if(contains('buttons__button-backspace')){
        
            let val =  querySelector('.calculator__output').value
             
            querySelector('.calculator__output').value = val.slice(0, val.length-1)
           
        }
    }
   

    mathOperation(operation, arr){

        let firstIndex = operation - 1
        let secondIndex = operation + 1
    
        switch(arr[operation]){
    
            case '*':
                arr[firstIndex] = parseFloat(arr[firstIndex]) * parseFloat(arr[secondIndex])
                break;
            case '/':
                arr[firstIndex] = parseFloat(arr[firstIndex]) / parseFloat(arr[secondIndex])
                break;
            case '+':
                arr[firstIndex] = parseFloat(arr[firstIndex]) + parseFloat(arr[secondIndex])
                break;
            case '-':
                arr[firstIndex] = parseFloat(arr[firstIndex]) - parseFloat(arr[secondIndex])
                break;
        }
    
        arr[operation] = false
        arr[secondIndex] = false
    
        return this.transform(arr)
    
    }

    transform(arr){
        let tranformArr = []

        for(let k = 0; k < arr.length; k++){
            if(arr[k] !== false) tranformArr.push(arr[k])
        }

	    return tranformArr
    }


    calculate(string){
            let arr_c = (string.match(/([0-9]+)|\+|-|\*|\//g))
	    let i = -1

	    if(!arr_c || arr_c.length == 1) return string

	    while(i++ < arr_c.length - 1){
		    if(arr_c[i] == '*'){
			    arr_c = this.mathOperation(i, arr_c)
			    i = i - 1
		    }
	    }
	
	    i = -1
	    while(i++ < arr_c.length - 1){
		    if(arr_c[i] == '/'){
			    arr_c = this.mathOperation(i, arr_c)
			    i--
		}
	}
	
	i = -1;
	while(i++ < arr_c.length - 1){

		if(arr_c[i] == '+'){
			arr_c = this.mathOperation(i, arr_c)
			i--
		}

		if(arr_c[i] == '-'){
			arr_c = this.mathOperation(i, arr_c)
			i--
		}

	}

	return arr_c[0]

    }

    finalCalculation(str){
       
        let result = str 
        let subCalculations = str.match(/\(([^()]+)\)/gmi)
        let insideCalc

        if(!subCalculations){
            return this.calculate(str) 
        }

        for(let k = 0; k < subCalculations.length; k++){
            insideCalc = subCalculations[k].replace(/\(|\)/g, '')
		    result = result.replace('('+insideCalc+')', this.calculate(insideCalc))
        }

        if(result.indexOf('(') >= 0){
		return finalCalculation(result)
	}
	    
	return this.calculate(result)
    } 
}

new Calculator(
    document.body.querySelector('.buttons')
)
