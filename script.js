let e = 0;
let valute = ['RUB','USD'];
function space (num){
    let dot = false;
    for(let i = 0; i<num.length;i++){
        if(num[i] == ".") dot = true;
    }
    if(dot){
        let parts = num.toString().split(".");
        for(let i = 0;i<2;i++)
            parts[i] = parts[i].replace(/[^0-9,]/g,'');
        parts [0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return parts.join(".");
    }
    else{
        let parts = num.toString();
        parts = parts.replace(/[^0-9,]/g,'');
        parts = parts.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return parts;
    }
}
function despace(num){
    let dot = false;
    for(let i = 0; i<num.length;i++)
        if(num[i] == ".") dot = true;
    if(dot){
        num = num.split(".")
        num[0] = num[0].replace(/[^0-9,]/g,'');
        return num.join(".")
    }
    else{
    return num = num.replace(/[^0-9,]/g,'');
    }
}
function calculation(sum1,sum2,sum_num1,sum_num2){
    fetch(`https://api.exchangerate.host/latest?base=${sum_num1}&symbols=${sum_num2}`)
    .then(response => response.json())
    .then(data => {
    sum1 = despace(sum1);
    sum2.value = sum1 * data.rates[sum_num2];
    sum2.value = space(sum2.value);
    up(sum2);
    })
    .catch((err)=>{
        alert('Connection problem');
    })
}
function changeValute(){
    for(let i = 0; i<2;i++){
    fetch(`https://api.exchangerate.host/latest?base=${valute[i]}&symbols=${valute[i==0?1:0]}`)
    .then(response => response.json())
    .then(data => {
        document.querySelectorAll('.ammount_p')[i].innerHTML = `1 ${valute[i]} = ${data.rates[valute[i==0?1:0]]} ${valute[i==0?1:0]}`
    })
    .catch((err)=>{
        alert('Connection problem');
    })
}
}
changeValute();
function up(e) {
    e.value = space(e.value);
    if (e.value.indexOf(".") != '-1') {
      e.value=e.value.substring(0, e.value.indexOf(".") + 5);
    }
    e.value = e.value.replace(",",".")
}
function dot_zero(e){
    let dot1 = false;
    e = e.split("");
    for(let i = 0; i<e.length;i++){
    if(e.length == 1 && e[i] == ".") e[i]=""
    else if(e.length == 2 && e[i-1] == "0" && e[i]!=".") e[i]=""
    else if(e[i]=="." && dot1 == true) e[i] = ""
    else if(e[i] == ".") dot1 = true;
    }
    e = e.join("");
    return e;
}
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
event.target.value = dot_zero(event.target.value);
calculation(document.querySelectorAll('input')[0].value,document.querySelectorAll('input')[1],valute[0],valute[1]);
changeValute();
})
document.querySelectorAll('input')[1].addEventListener('input', (event) => {
event.target.value = dot_zero(event.target.value);
calculation(document.querySelectorAll('input')[1].value,document.querySelectorAll('input')[0],valute[1],valute[0]);
changeValute();
})  