//создаём переменные  для записи товаров в корзину И избранное, переменную для подсчёта товаров в корзине. Точнее id товаров
//и записываем в них значения localStorage
let arrayCart = window.localStorage.getItem('cart');
let arrayHeart = window.localStorage.getItem('heart');
let countProduct = window.localStorage.getItem('countCart');


//если нет сохранённого, то создаём новые переменные. 
if (arrayCart == null){
    arrayCart = new Array();
}else {arrayCart = JSON.parse(arrayCart);}

if (arrayHeart == null){
    arrayHeart = new Array();
}else {arrayHeart = JSON.parse(arrayHeart);}

if (countProduct == null){
    countProduct = 0;
}


//впишем в красный круг корзины количество товаров из переменной countCart
document.getElementById('countProduct').innerHTML = countProduct;


//переменные для записи элементов HTML
//основной контейнер, куда будут отрисовываться все страницы.
let containerPage = document.getElementById('containerPage');

let containerCountProduct = document.getElementById('countProduct');

//шаблоны для отрисовки
let templateCatalog = document.getElementById('tmpl-catalog').innerHTML;
let templateCard = document.getElementById('tmpl-card').innerHTML;
let templateMainContent = document.getElementById('mainContent').innerHTML;
let templateCart = document.getElementById('tmpl-cart').innerHTML;

//let templateDeliveryPay = document.getElementById('tmpl-deliveryPay').innerHTML;
//let templateContacts = document.getElementById('tmpl-contacts').innerHTML;


//отрисуем при загрузке Главную страницу путём вызова функции
renderMainPage();


//функция очистки страницы
function clearPage(){
    containerPage.innerHTML="";
}


//функция вывода главной страницы
function renderMainPage(){
    clearPage();
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
    containerPage.innerHTML += templateCatalog.replace('${id}', data[0]['id'])
                                            .replace('${title}', data[0]['product_name'])
                                            .replace('${photo}', data[0]['image'])
                                            .replace('${price}', data[0]['price'])
                                            .replace('{rate}', 'рейтинг')
                                            .replace('{count}', 'число')
                                            .replace('{description}', data[0]['product_description']);
                                   
}

  

//добавление товара в корзину (записываем в ls только id)
//ПОКА ДОБАВЛЕНИЯ НЕТ, ТОЛЬКО ПОДСЧЁТ В КРУЖОЧКЕ, СКОЛЬКО РАЗ НАЖАЛИ НА ADD
function addProductInCart(){

    countProduct++;
    containerCountProduct.innerHTML = countProduct;

}
