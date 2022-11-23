let e = 0;
let valute = ['RUB','USD'];
function calculation(sum1,sum2,sum_num1,sum_num2){
    fetch(`https://api.exchangerate.host/latest?base=${sum_num1}&symbols=${sum_num2}`)
    .then(response => response.json())
    .then(data => {
    sum2.value = sum1 * data.rates[sum_num2];
    return up(sum2);
    })
    .catch((err)=>{
        alert('Connection problem');
    })
}
function changeValute(){
    for(let i = 0; i<2;i++){
    if(i==0){
    fetch(`https://api.exchangerate.host/latest?base=${valute[0]}&symbols=${valute[1]}`)
    .then(response => response.json())
    .then(data => {
        document.querySelectorAll('.ammount_p')[0].innerHTML = `1 ${valute[0]} = ${data.rates[valute[1]]} ${valute[1]}`
    })
    .catch((err)=>{
        alert('Connection problem');
    })
}
   else{
    fetch(`https://api.exchangerate.host/latest?base=${valute[1]}&symbols=${valute[0]}`)
    .then(response => response.json())
    .then(data => {
        document.querySelectorAll('.ammount_p')[1].innerHTML = `1 ${valute[1]} = ${data.rates[valute[0]]} ${valute[0]}`
    })
    .catch((err)=>{
        alert('Connection problem');
    })
   }
}
}
changeValute();
function up(e) {
    if (e.value.indexOf(".") != '-1') {
      e.value=e.value.substring(0, e.value.indexOf(".") + 5);
    }
}
// function space(e){
//     let parts = e.toString().split(".");
//     parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");                     
//     return parts.join(".");
// }
document.querySelectorAll('.left').forEach((item,index)=>{
    item.addEventListener('click',()=>{
        item.style.backgroundColor = '#833AE0';
        item.style.color = 'white';
    for(let i = 0; i<document.querySelectorAll('.left').length;i++){
        if(i!=index){
        document.querySelectorAll('.left')[i].style.backgroundColor = 'white';
        document.querySelectorAll('.left')[i].style.color = '#C6C6C6';
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
        item.style.color = 'white';
        for(let i = 0; i<document.querySelectorAll('.right').length;i++){
            if(i!=index){
            document.querySelectorAll('.right')[i].style.color = '#C6C6C6';
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
changeValute();
})
document.querySelectorAll('input')[1].addEventListener('input', (event) => {
calculation(document.querySelectorAll('input')[1].value,document.querySelectorAll('input')[0],valute[1],valute[0]);
changeValute();
})  