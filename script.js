const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")
const form = document.querySelector("form")

const onlyNumbersRegex = /\D+/g

amount.oninput = () => {
    let value = amount.value.replace(onlyNumbersRegex, "")
    value = Number(value)/100
    amount.value = formatCurrencyBRL(value)
}

form.onsubmit = (e) => {
    e.preventDefault()
    
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        caregoryId: category.value,
        categoryName: category.options[category.selectedIndex].text,
        amount: amount.value,
        createdAr: new Date()
    }


        
    
}


function formatCurrencyBRL(value) {
    
    value = value.toLocaleString('pt-BR',{
        style: 'currency',
        currency: 'BRL'
    })

    return value
}