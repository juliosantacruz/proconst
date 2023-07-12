export function setFormat(amount:number){
    const amountFormated = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency:'USD'
    }).format(amount)
    
    



    return amountFormated
}

 