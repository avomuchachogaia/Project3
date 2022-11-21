let valute = ['RUB','RUB'];
let currency = [];
function changeValute(){
    calculationForCurrency(1,0,valute[0],valute[1]);
    calculationForCurrency(1,1,valute[1],valute[0]);
    document.querySelectorAll('.ammount_p')[0].innerHTML = `1 ${valute[0]} = ${currency[0]} ${valute[1]}`;
    document.querySelectorAll('.ammount_p')[1].innerHTML = `1 ${valute[1]} = ${currency[1]} ${valute[0]}`;
}
function calculation(sum1,sum2,sum_num1,sum_num2){
    fetch(`https://api.exchangerate.host/latest?base=${sum_num1}&symbols=${sum_num2}`)
    .then(response => response.json())
    .then(data => {
    return sum2.value = sum1 * data.rates[sum_num2];
    })
}
function calculationForCurrency(sum1,i,sum_num1,sum_num2){
    fetch(`https://api.exchangerate.host/latest?base=${sum_num1}&symbols=${sum_num2}`)
    .then(response => response.json())
    .then(data => {
    currency[i] = sum1 * data.rates[sum_num2];
    })
}
changeValute();
document.querySelectorAll('.left').forEach((item,index)=>{
    item.addEventListener('click',()=>{
        item.style.backgroundColor = '#833AE0';
    for(let i = 0; i<document.querySelectorAll('.left').length;i++){
        if(i!=index){
        document.querySelectorAll('.left')[i].style.backgroundColor = 'white'
        }
    }
    valute[0] = item.innerHTML;
    changeValute();
    calculation(document.querySelectorAll('input')[1].value,document.querySelectorAll('input')[0],valute[1],valute[0]);
    })
})
document.querySelectorAll('.right').forEach((item,index)=>{
    item.addEventListener('click',()=>{
        item.style.backgroundColor = '#833AE0';
        for(let i = 0; i<document.querySelectorAll('.right').length;i++){
            if(i!=index){
            document.querySelectorAll('.right')[i].style.backgroundColor = 'white'
            }
        }
    valute[1] = item.innerHTML;
    changeValute();
    calculation(document.querySelectorAll('input')[0].value,document.querySelectorAll('input')[1],valute[0],valute[1]);
    })
})
document.querySelectorAll('input')[0].addEventListener('input', (event) => {
calculation(document.querySelectorAll('input')[0].value,document.querySelectorAll('input')[1],valute[0],valute[1]);
})

document.querySelectorAll('input')[1].addEventListener('input', (event) => {
calculation(document.querySelectorAll('input')[1].value,document.querySelectorAll('input')[0],valute[1],valute[0]);
})
    