const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")
const form = document.querySelector("form")
const expenseList = document.querySelector("ul")

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

    expenseAdd(newExpense)
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
        
        const expenseCategoryIcon = document.createElement("img")
        expenseCategoryIcon.setAttribute("src",`./img/${newExpense.caregoryId}.svg`)
        expenseCategoryIcon.setAttribute("alt",newExpense.categoryName)
                
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")
        
        const expenseDescription = document.createElement("strong")        
        expenseDescription.textContent = newExpense.expense
        
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.categoryName

        expenseInfo.append(expenseDescription)
        expenseInfo.append(expenseCategory)

        const expenseAmount = document.createElement("span")
        const expenseAmountSign = document.createElement("small")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.append(expenseAmountSign)
        expenseAmountSign.textContent = "R$"
        expenseAmount.textContent = newExpense.amount

        // <img src="./img/remove.svg" alt="remover" class="remove-icon" />
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