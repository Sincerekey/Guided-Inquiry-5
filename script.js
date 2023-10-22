class Calculator{
    constructor(previOperandTextElement, currOperandTextElement){
        this.previOperandTextElement = previOperandTextElement
        this.currOperandTextElement = currOperandTextElement
        this.clear()
    }
    clear(){
        this.currOperand = ''
        this.previOperand = ''
        this.operation = undefined
    }

    delete(){
        this.currOperand = this.currOperand.toString().slice(0, -1)
    }

    appendNumber(number){
        if (number === '.' && this.currOperand.includes('.')){return}
        this.currOperand = this.currOperand.toString() + number.toString()
        console.log('Append successful')
    }

    chooseOperantion(operation){
        if (this.currOperand === ''){return;}
        if (this.previOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previOperand = this.currOperand
        this.currOperand = ''
    }

    compute(){
        let computation
        const prev = parseFloat(this.previOperand)
        const current = parseFloat(this.currOperand)
        if((this.operation === '÷' && current === 0) || (isNaN(current))){
            alert("Can't Divide by Zero")
            this.operation = undefined
            this.previOperand = ''
            return;
         }
        switch (this.operation){
            case '+':
                computation = prev + current
                break
            case '÷':
                 computation = prev / current
                 break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '%':
                computation = (prev/100) * current
                break
            default:
                return
        }
        this.currOperand = computation
        this.operation = undefined
        this.previOperand = ''
    }
    getDisplayNumber(number){
        const floatNumber = parseFloat(number)
        if (isNaN(floatNumber)) return ''
        return floatNumber.toLocaleString('en')
    }

    updateDisplay(){
        this.currOperandTextElement.innerText =
         this.getDisplayNumber (this.currOperand)
        if(this.operation != null){
        this.previOperandTextElement.innerText = 
        `${this.getDisplayNumber(this.previOperand)} 
        ${this.operation}`} else{ {this.previOperandTextElement.innerText = ''}}
    };
    // Doesn't Work COME BACK TO THIS!!!!
    addParentheses(){
     if (this.currOperand !== ''){
        this.currOperand = '(' + this.currOperand + ')';
     }
    }

        }
const numberButtons = document.querySelectorAll('[data-number]')
const operantionButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previOperandTextElement = document.querySelector('[data-previOperant]')
const currOperandTextElement = document.querySelector('[data-currOperant]')
const parentheses = document.querySelector('[data-Parentheses]')

const calculator = new Calculator(previOperandTextElement, currOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () =>{
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
})
})

operantionButtons.forEach(button => {
    button.addEventListener('click', () =>{
    calculator.chooseOperantion(button.innerText)
    calculator.updateDisplay()
})
})

equalsButton.addEventListener( 'click', ()=>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () =>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () =>{
    calculator.delete()
    calculator.updateDisplay()
})

parentheses.addEventListener('click', () => {
    calculator.addParentheses();
    calculator.updateDisplay();
});


