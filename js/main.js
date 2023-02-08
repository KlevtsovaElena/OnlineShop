
//создаём переменные  для записи товаров в корзину И избранное, переменную для подсчёта товаров в корзине. Точнее id товаров
//и записываем в них значения localStorage
let arrayCart = window.localStorage.getItem('cart');
let arrayFavorite = window.localStorage.getItem('favorite');
let countProduct = window.localStorage.getItem('countProduct');


//если нет сохранённого, то создаём новые переменные. 
if (arrayCart == null || arrayCart == 'null' || arrayCart == ''){
    arrayCart = new Array();
}else {arrayCart = JSON.parse(arrayCart);}

if (countProduct == null){
    countProduct = 0;
}


//проверка
console.log(arrayCart);
console.log(countProduct);


//переменные для записи элементов HTML
//основной контейнер, куда будут отрисовываться все страницы.
const containerPage = document.getElementById('containerPage');
//контейнер для счётчика товаров в корзине (красный круг)
const containerCountProduct = document.getElementById('countProduct');

//шаблоны для отрисовки
const templateCatalog = document.getElementById('tmpl-catalog').innerHTML;
const templateCard = document.getElementById('tmpl-card').innerHTML;
const templateMainContent = document.getElementById('mainContent').innerHTML;
const templateCart = document.getElementById('tmpl-cart').innerHTML;
const templateContainerWatchCard = document.getElementById('tmpl-containerWatchCard').innerHTML;


//let templateDeliveryPay = document.getElementById('tmpl-deliveryPay').innerHTML;
//let templateContacts = document.getElementById('tmpl-contacts').innerHTML;

//впишем в красный круг корзины количество товаров из переменной countProduct
containerCountProduct.innerHTML = countProduct;

//отрисуем при загрузке Главную страницу путём вызова функции
renderMainPage();


//функция очистки страницы
function clearPage(){
    containerPage.innerHTML="";
}

//функция сохранения данных в localStorage
function save(keyData, saveData){
    //кодируем data в json и сохраняем в localStorage
    let dataJson = JSON.stringify(saveData);
    //сохраняем в localStorage
    localStorage.setItem(keyData, dataJson);
}


//функция вывода главной страницы
function renderMainPage(){
    clearPage();
    //выводим шаблон главной страницы
    containerPage.innerHTML = templateMainContent;
}


//функция для отправки запросов
function sendRequestGET(url){
    let requestObj = new XMLHttpRequest();
    requestObj.open('GET', url, false);
    requestObj.send();
    return requestObj.responseText;
}


//функция отрисовки каталога
function renderCatalog(){
    clearPage();

    //получаем данные каталога
    let json = sendRequestGET('http://localhost:8090/api/get/?table=Goods');
    //раскодируем данные
    let data = JSON.parse(json);

    console.log(data);

    //используем шаблон html - tmpl-catalog для вывода на страницу всех товаров из API
 //   containerPage.style.backgroundColor="";

        for (let i = 0; i < data.length; i++){   
        containerPage.innerHTML += templateCatalog.replace('${id}', data[i]['id'])
                                                    .replace('${id}', data[i]['id'])
                                                    .replace('${title}', data[i]['product_name'])
                                                    .replace('${photo}', data[i]['image'])
                                                    .replace('${price}', data[i]['price']);
        }
}   


//функция отрисовки карточки
function renderCard(id){

    clearPage();

    //получаем данные одного товара по id
    let json = sendRequestGET('http://localhost:8090/api/get/?table=Goods&id=' + id);
    //раскодируем данные
    let data = JSON.parse(json);

    console.log(data);
    console.log(data[0]['id']);


    //меняем данные в шаблоне данными из апишки
    containerPage.innerHTML += templateCard.replace('${id}', data[0]['id'])

                                            .replace('${title}', data[0]['product_name'])
                                            .replace('${photo}', data[0]['image'])
                                            .replace('${price}', data[0]['price'])
                                            .replace('{rate}', 'рейтинг')
                                            .replace('{count}', 'число')
                                            .replace('{description}', data[0]['product_description']);
                                   
}

  
//функция получения значений только нужного поля ассоц массива
function getValueField(arr, key){
    let valueFieldArray = [];
    for(let i = 0; i < arr.length; i++){
        valueFieldArray.push(arr[i][key]);
    }
    console.log(valueFieldArray);
    return valueFieldArray;

}
//добавление товара в корзину (записываем в ls только id)
function addProductInCart(){

    //определяем на кнопку какого товара нажали (его id)
    let productId = event.target.getAttribute('product-id');

    //получим только id корзины
    let idArrayCart = getValueField(arrayCart, 'id');

    //
    let indexElement = idArrayCart.indexOf(productId);

    if (indexElement == -1){
        arrayCart.push({'id': productId, 'count': 1}); 
    } else {
        arrayCart[indexElement]['count'] = arrayCart[indexElement]['count'] + 1;
    }
  
    console.log(arrayCart);  

    //пересохраняем массив товаров Корзины в localStorage
    save('cart', arrayCart);

    //плюсуем в счётчик товаров в корзине
    countProduct++;
    //перерисовываем значение счётчика
    containerCountProduct.innerHTML = countProduct;
    //сохраняем новое значение в lS
    save('countProduct', countProduct);

/*-----------------------------------
ВАРИАНТ 2
    //и наичнаем проверять нашу корзину
    //если в корзине вообще нет товаров, то просто пушим этот айдишник и кол-во товара = 1
    if (arrayCart.length == 0){
        arrayCart.push({'id': productId, 'count': 1});
    }else {
        //если в корзине товары есть
        //вводим переменную, как метку. если 0 - то такого id в массиве нет, если 1 - то есть. пока ставим 0, тк мы не знаем есть ли 
        let inArray = 0;

        //пробегаемся по массиву
        for (let i = 0; i < arrayCart.length; i++){

            //если айдишник в корзине есть
            if (arrayCart[i]['id'] == productId) {

                //то меняем count на +1
                arrayCart[i]['count'] = arrayCart[i]['count'] + 1;
                //и меняем метку на 1
                inArray = 1;
                //прерываем цикл
                break;

            }
        }

        //дальше проверяем изменилась ли метка
        if (inArray == 0) {
            //если не изменилась, значит, товара в корзине нет и можно его просто запушить 
            arrayCart.push({'id': productId, 'count': 1});
        }
      
    }
--------------------------------*/  

}

//отрисовка Корзины
function showCart(){
    clearPage();

    // //получим только id корзины

    let idArrayCart = getValueField(arrayCart, 'id');
    let id = idArrayCart.join(',');


    let json = sendRequestGET('http://localhost:8090/api/get/?table=Goods&id=' + id);
    let data=JSON.parse(json);

    let price = 0;
    let watchCards = '';

for (let i = 0;  i < arrayCart.length; i++){
    for (let j = 0; j < data.length; j++){
        if (data[j]['id'] == arrayCart[i]['id']){
            console.log('отрисовка ' + data[j]['id']);
            price += data[j]['price'] * arrayCart[i]['count'];
            
            watchCards += templateContainerWatchCard.replace('${photo}', data[j]['image'])
            .replace('${title}', data[j]['product_name'])
            .replace('${count}', arrayCart[i]['count'])
            .replace('${price}', data[j]['price'] * arrayCart[i]['count']);


            break;
        }
    } 
}
    

    containerPage.innerHTML += templateCart.replace('${count}', countProduct)
                                            .replace('${countSum}', price)
                                            .replace('${watchCards}', watchCards);
 }

/*
<template id="tmpl-cart">
<div class="cart">
    <h1>Корзина</h1>
    <p>${count} позиций на сумму ${countSum}</p>
    <div class="watchCard">
        <img src="${photo}" alt="" class="watch-img">
        <div class="watch-name">${title}</div>
        <div class="watch-count">${count}</div>
        <div class="watch-price">${price}</div>
        <div class="watch-delete">${delete}</div>
    </div>
</div>
</template>

*/


let arr = [1,3,3,1,1,1];
function uniq(arr){
    let tmp = [];
    for (let i = 0; i < arr.length; i++){
        if(tmp.indexOf(arr[i]) == -1){
            tmp.push(arr[i]);
        }
    }
    return tmp;
}

console.log(uniq(arr));
