const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")
const form = document.querySelector("form")
const expenseList = document.querySelector("ul")
const expenseCounter = document.querySelector("aside header p span")
const expenseTotalAmount = document.querySelector("aside header h2")
const onlyNumbersRegex = /\D+/g


updateTotals()

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

    expenseAdd(newExpense)
    updateTotals()
}

function formatCurrencyBRL(value) {
    
    value = value.toLocaleString('pt-BR',{
        style: 'currency',
        currency: 'BRL'
    })

    return value
}

function expenseAdd (newExpense) {
    try {
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")
        expenseItem.setAttribute("id",newExpense.id)
        
        const expenseCategoryIcon = document.createElement("img")
        expenseCategoryIcon.setAttribute("src",`./img/${newExpense.caregoryId}.svg`)
        expenseCategoryIcon.setAttribute("alt",newExpense.categoryName)
                
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")
        
        const expenseDescription = document.createElement("strong")        
        expenseDescription.textContent = newExpense.expense
        
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.categoryName

        expenseInfo.append(expenseDescription,expenseCategory)

        const expenseAmount = document.createElement("span")        
        expenseAmount.classList.add("expense-amount")        
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount}`
        
        const expenseDeleteIcon = document.createElement("img")
        expenseDeleteIcon.setAttribute("src", "./img/remove.svg")
        expenseDeleteIcon.setAttribute("alt","remover")
        expenseDeleteIcon.classList.add("remove-icon")

        expenseItem.append(expenseCategoryIcon)
        expenseItem.append(expenseInfo)        
        expenseItem.append(expenseAmount)
        expenseItem.append(expenseDeleteIcon)

        expenseList.append(expenseItem)

    } catch (error) {
        console.log(error)
        alert("Erro ao criar despesa, tente novamente mais tarde")
        
    }
}

function updateTotals(){
    const items = expenseList.children
    const count = expenseList.children.length
    let totalAmount = 0
    
    expenseCounter.textContent = `${count} ${count > 1 ? 'despesas' : 'despesa'}`
     
    for (let item = 0 ; item < items.length; item++) {
        const itemAmount = items[item].querySelector('.expense-amount')

        let value = itemAmount.textContent.replace(onlyNumbersRegex,"")/100

        totalAmount = totalAmount + value        
    }
    totalAmount = formatCurrencyBRL(totalAmount).replace("R$","")
    expenseTotalAmount.innerHTML = `<small>R$</small>${totalAmount}`
}

expenseList.addEventListener("click", function(e) {
    if(e.target.classList.contains("remove-icon")) {

        e.target.closest(".expense").remove()
        updateTotals()
        
    }
})