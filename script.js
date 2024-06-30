const amount = document.getElementById("amount")
const onlyNumbersRegex = /\D+/g

amount.oninput = () => {
    let value = amount.value.replace(onlyNumbersRegex, "")
    value = Number(value)/100
    amount.value = formatCurrencyBRL(value)    
}

function formatCurrencyBRL(value) {
    
    value = value.toLocaleString('pt-BR',{
        style: 'currency',
        currency: 'BRL'
    })    
    return value
}