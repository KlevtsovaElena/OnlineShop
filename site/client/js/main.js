
//создаём переменные  для записи товаров в корзину И избранное, переменную для подсчёта товаров в корзине. Точнее id товаров
//и записываем в них значения localStorage
let arrayCart = window.localStorage.getItem('onlineShop_cart');
let arrayFavorite = window.localStorage.getItem('onlineShop_favorite');

//переменная для подсчёта товаров в корзине
let countProduct = 0;

//если нет сохранённого в ls, то создаём новые переменные. 
if (arrayCart == null || arrayCart == 'null' || arrayCart == ''){
    arrayCart = new Array();
}else {arrayCart = JSON.parse(arrayCart);}


//функция подсчёта товаров в корзине
function countProductInCart(){
    countProduct = 0;
    for (let i = 0;  i < arrayCart.length; i++){
        countProduct += arrayCart[i]['count']; 
    }
    return countProduct;
}


//вызываем функцию подсчёта товаров в корзине, чтобы записать в переменную countProduct
countProductInCart();

//переменные для записи элементов HTML
//основной контейнер, куда будут отрисовываться все страницы.
const containerPage = document.getElementById('containerPage');
//контейнер для счётчика товаров в корзине (красный круг)
const containerCountProduct = document.getElementById('countProduct');
//контейнер для панели сортировки и фильтрации
const sortFilterContainer = document.getElementById('sort-filter-container');

//шаблоны для отрисовки
const templateCatalog = document.getElementById('tmpl-catalog').innerHTML;
const templateCard = document.getElementById('tmpl-card').innerHTML;
const templateMainContent = document.getElementById('mainContent').innerHTML;
const templateCart = document.getElementById('tmpl-cart').innerHTML;
const templateContainerWatchCard = document.getElementById('tmpl-containerWatchCard').innerHTML;
const templateCartEmpty = document.getElementById('tmpl-cart-empty').innerHTML;
const templateWatchMain = document.getElementById('tmpl-watchMain').innerHTML;
const templateSort = document.getElementById('tmpl-sort').innerHTML;
const templateLogin = document.getElementById('tmpl-login').innerHTML;
const templatePriceInterval = document.getElementById('tmpl-priceInterval').innerHTML;
const templateItem = document.getElementById('tmpl-item').innerHTML;
const templateFilter = document.getElementById('tmpl-filters').innerHTML;

//переменная-метка для того, чтобы очищать или не очищать панель сортировки
let sort = -1;

//впишем в красный круг корзины количество товаров из переменной countProduct
containerCountProduct.innerHTML = countProduct;

//отрисуем при загрузке Главную страницу путём вызова функции
renderMainPage();

//проверка
console.log(arrayCart);


//функция очистки страницы
function clearPage(){
    containerPage.innerHTML="";
    if (sort == -1) {
        sortFilterContainer.innerHTML="";
    }
}


//функция сохранения данных в localStorage
function save(keyData, saveData){
    //кодируем data в json и сохраняем в localStorage
    let dataJson = JSON.stringify(saveData);
    //сохраняем в localStorage
    localStorage.setItem(keyData, dataJson);
}


//функция для отправки запросов GET
function sendRequestGET(url){
    let requestObj = new XMLHttpRequest();
    requestObj.open('GET', url, false);
    requestObj.send();
    return requestObj.responseText;
}


//функция вывода главной страницы
function renderMainPage(){

    sort=-1;
    //очищаем страницу
    clearPage();

    //запрос на получение 4 последних добаленных товаров
    let jsonNewRelease = sendRequestGET("http://localhost/api/get/goods/?field=date_goods&orderBy=DESC&limit=4");
    //раскодируем данные
    let dataNewRelease = JSON.parse(jsonNewRelease);
    
    //соберём все карточки этих товаров
    let watchNew = '';

    for (let i = 0; i < dataNewRelease.length; i++){
        watchNew+= templateWatchMain.replace('${id}', dataNewRelease[i]['id'])
                                    .replace('${title}', dataNewRelease[i]['product_name'])
                                    .replace('${photo}', dataNewRelease[i]['image'])
                                    .replace('${price}', dataNewRelease[i]['price'])
    }

    //запрос на получение 4 товаров, которых купили больше всего раз
    let jsonFanFavorites = sendRequestGET("http://localhost/api/get/goods/?field=sold&orderBy=DESC&limit=4");
    //раскодируем данные
    let dataFanFavorites = JSON.parse(jsonFanFavorites);

    //соберём все карточки этих товаров
    let watchFan = '';

    for (let i = 0; i < dataFanFavorites.length; i++){
        watchFan+= templateWatchMain.replace('${id}', dataFanFavorites[i]['id'])
                                    .replace('${title}', dataFanFavorites[i]['product_name'])
                                    .replace('${photo}', dataFanFavorites[i]['image'])
                                    .replace('${price}', dataFanFavorites[i]['price'])
    }

    //выводим в шаблон главной страницы собранные карточки
    containerPage.innerHTML = templateMainContent.replace('${watchesNew}', watchNew)
                                                 .replace('${watchesFanFavorites}', watchFan);
}



function renderSortFilterPannel(){

    let json = sendRequestGET('http://localhost/api/get/filter/?');

    console.log(json);
    //раскодируем данные
    let data = JSON.parse(json);

    sortFilterContainer.innerHTML += templateSort;
    let items = '';

    for (let i = 0; i < data.length; i++) { 
        for (let j = 0; j < data[i].length; j++) {
            items += templateItem.replace('${id}', data[i][j]['id'])
                                    .replace('${name}', data[i][j]['name'])
                                    .replace('${name}', data[i][j]['name']);
        }
        sortFilterContainer.innerHTML += templateFilter.replace('${filter}', data[i][0]['name_table'].toLowerCase())
                                                        .replace('${filter}', data[i][0]['name_table'])
                                                    .replace('${filter_item}',  items);
        items = '';    
    }  
    
    sortFilterContainer.innerHTML += templatePriceInterval;

    // //СОРТИРОВКА
    // //получаем  Select со всеми элементами
    // let select = document.querySelector('select');
    // //по его изменению запускаем функцию
    // select.onchange = function(){
    //     //получим индекс выбранного элемента 
    //     let indexSelected = select.selectedIndex;
    //     //получим сам элемент
    //     let option = select.querySelectorAll('option')[indexSelected];
    //     for(let i = 0; i < select.length; i++){
    //         select.querySelectorAll('option')[i].removeAttribute('selected');
    //     }
    //     //
    //     option.setAttribute('selected', 'selected');
    //     option.selected = true;
    //     //соберём необходимые данные для запроса и сортировки
    //     let getParams = 'field=' + option.getAttribute('value') + '&orderBy=' + option.getAttribute('order');
    //     //меняем нашу метку, чтобы не перерисовывать панель сортировки
    //     sort = indexSelected;
    //     //перерисовываем 
    //     renderCatalog(getParams);
    //}

}

function buildParams(){

    let paramFilter='';
    let  ul = document.querySelectorAll('.filter_item');
    for (let i = 0; i<ul.length; i++){
        let li='';
        let table = ul[i].getAttribute('id');
        for(let j = 0; j < ul[i].childElementCount; j++) {
            
            let li2 = ul[i].querySelectorAll('li')[j].querySelector('input');
            if(li2.checked == true){
                li +=  li2.getAttribute('id') + ',';

            }
        }
        if(li!==''){
            li = li.substring(0, li.length-1);
            if(paramFilter==''){
               
                paramFilter = table + '=' + li;
            }
             else{
                paramFilter += '&' + table + '=' + li;
             }   
            
        }  
        

    }

    
    let price1 = document.getElementById('priceTo').value;
    let price2 = document.getElementById('priceDo').value; 

    if(price2 !== '' && (price1 < price2)) {

            paramFilter += '&price1=' + price1 + '&price2=' + price2;
   }   

    let select = document.querySelector('select');
    let indexSelected = select.selectedIndex;
    if(indexSelected !== 0){
        let option = select.querySelectorAll('option')[indexSelected];
        paramFilter += '&field=' + option.getAttribute('value') + '&orderBy=' + option.getAttribute('order');
    }

sort=1;
    renderCatalog(paramFilter);
}


let tempCCCCCCCCCCC="";
//функция отрисовки каталога
function renderCatalog(getParams){

console.log('http://localhost/api/get/goods/?' + getParams)
    //очищаем страницу
    clearPage();

    //если наша метка не изменилась, те сортировка не была запущена, то отрисовываем панель сортировки
    //если же не равна -1, то оставляем с теми параметрами, какие сейчас есть
    if (sort == -1){
        renderSortFilterPannel();
    }

    //получаем данные каталога
    json = sendRequestGET('http://localhost/api/get/goods/?' + getParams);
    //раскодируем данные
    let data = JSON.parse(json);

    console.log(data);

    //собираем карточки и выводим их на страницу
    for (let i = 0; i < data.length; i++){   
    containerPage.innerHTML += templateCatalog  .replace('${id}', data[i]['id'])
                                                .replace('${id}', data[i]['id'])
                                                .replace('${title}', data[i]['product_name'])
                                                .replace('${photo}', data[i]['image'])
                                                .replace('${price}', data[i]['price'])
                                                .replace('${шт}', data[i]['quantity']);
    }

    // //СОРТИРОВКА
    // //получаем  Select со всеми элементами
    // let select = document.querySelector('select');
    // //по его изменению запускаем функцию
    // select.onchange = function(){
    //     //получим индекс выбранного элемента 
    //     let indexSelected = select.selectedIndex;
    //     //получим сам элемент
    //     let option = select.querySelectorAll('option')[indexSelected];
    //     for(let i = 0; i < select.length; i++){
    //         select.querySelectorAll('option')[i].removeAttribute('selected');
    //     }
    //     //
    //     option.setAttribute('selected', 'selected');
    //     option.selected = true;
    //     //соберём необходимые данные для запроса и сортировки
    //     let getParams = 'field=' + option.getAttribute('value') + '&orderBy=' + option.getAttribute('order');
    //     //меняем нашу метку, чтобы не перерисовывать панель сортировки
    //     sort = indexSelected;
    //     //перерисовываем 
    //     renderCatalog(getParams);
    // }
}


//функция отрисовки карточки
function renderCard(id){

    sort = -1;
    //очищаем страницу
    clearPage();
    //сбрасываем скролл в ноль
    window.scrollTo(0,0);
    //получаем данные одного товара по id
    let json = sendRequestGET('http://localhost/api/get/goods/?id=' + id);
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
                                            .replace('${description}', data[0]['product_description'])
                                            .replace('${шт}', data[0]['quantity'])
                                            .replace('${шт}', data[0]['quantity']);                                  
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


//функция добавления товара в корзину (записываем в ls только id и count)
function addProductInCart(){

    //определяем на кнопку какого товара нажали (его id)
    let productId = event.target.getAttribute('product-id');
    let inStock = event.target.getAttribute('quantity');

    //получим только id корзины
    let idArrayCart = getValueField(arrayCart, 'id');
    //узнаем есть ли такой товар в корзине
    let indexElement = idArrayCart.indexOf(productId);
    //если нет
    if (indexElement == -1){
        //просто добавляем в корзину с количеством 1
        arrayCart.push({'id': productId, 'count': 1}); 
    } else {
        //если же уже есть в корзине , то прибавляем только количество до того момента, пока товар есть в наличии
        if (inStock >= (arrayCart[indexElement]['count']+1)){
            arrayCart[indexElement]['count'] = arrayCart[indexElement]['count'] + 1;
        }else{ return};
    }
  
    console.log(arrayCart);  

    //пересохраняем массив товаров Корзины в localStorage
    save('onlineShop_cart', arrayCart);

    //плюсуем в счётчик товаров в корзине
    countProduct++;
    //перерисовываем значение счётчика
    containerCountProduct.innerHTML = countProduct;
}


//отрисовка Корзины
function renderCart(){

    sort = -1;
    //очищаем страницу
    clearPage();

    //если корзина пустая, то выводим соответствующий шаблон и выходим из функции (return)
    if (arrayCart.length==0){
        containerPage.innerHTML = templateCartEmpty;
        return;
    }

    //получим только id корзины
    let idArrayCart = getValueField(arrayCart, 'id');
    let id = idArrayCart.join(',');

    //делаем запрос и получаем данные
    let json = sendRequestGET('http://localhost/api/get/goods/?=id' + id);
    //раскодируем данные
    let data=JSON.parse(json);

    //вводим переменную для подсчёта общей стоимости
    let price = 0;

    //собираем все товары корзины по шаблону в переменную
    let watchCards = '';
    //берём товар из корзины
    for (let i = 0;  i < arrayCart.length; i++){
        //бежим по всем товарам из каталога
        for (let j = 0; j < data.length; j++){
            //если их id совпадают, то добавляем товар в отрисовку и обновляем стоимость и выходим из внутреннего цикла (break)
            if (data[j]['id'] == arrayCart[i]['id']){
                price += data[j]['price'] * arrayCart[i]['count'];
                
                watchCards += templateContainerWatchCard.replace('${photo}', data[j]['image'])
                                                        .replace('${title}', data[j]['product_name'])
                                                        .replace('${count}', arrayCart[i]['count'])
                                                        .replace('${price}', data[j]['price'] * arrayCart[i]['count'])
                                                        .replace('${id}', arrayCart[i]['id'])
                                                        .replace('${id}', arrayCart[i]['id'])
                                                        .replace('${id}', arrayCart[i]['id'])
                                                        .replace('${id}', arrayCart[i]['id'])
                                                        .replace('${шт}', data[j]['quantity'])
                                                        .replace('${шт}', data[j]['quantity']);
                break;
        }
    } 
}
 
    //отрисовываем всё на страницу
    containerPage.innerHTML += templateCart.replace('${count}', countProduct)
                                            .replace('${countSum}', price)
                                            .replace('${watchCards}', watchCards);
}


//функция удаления товара из корзины по id
function deleteProductCart(id){
    
    //запрашиваем подтверждение
    let ok = confirm("Удалить из корзины этот товар?");  //true / false
    if(ok==false){
        return;
    }      
    
    //если ок, то бежим по id в корзине и сравниваем с id товара. Если совпадают, то удалем из корзины запись
    for (let i = 0;  i < arrayCart.length; i++){
        if (arrayCart[i]['id'] == id) {
            arrayCart.splice(i, 1);
            break;
        }
    }

    //пересчитываем общее количество товаров в корзине и перерисвываем в кружочке
    countProduct = countProductInCart();
    containerCountProduct.innerHTML = countProduct;

    //пересохраняем массив товаров Корзины в localStorage
    save('onlineShop_cart', arrayCart);

    //перерисовываем корзину
    renderCart();
}


//уменьшение количества одного товара (максимум до 1)
function minusProduct(id){
    //бежим по корзине и сравниваем Id в корзине и id уменьшаемого товара
    for(let i = 0; i < arrayCart.length; i++){
        if (arrayCart[i]['id'] == id) {
            //если товара всего 1 в корзине, то выходим из функции
            if(arrayCart[i]['count']==1){
                return;
            }
            //иначе уменьшаем на 1 и выходим из цикла
            arrayCart[i]['count'] = arrayCart[i]['count']-1;
            break;
        }
    }

    //пересчитываем общее количество товаров в корзине и перерисвываем в кружочке
    countProduct = countProductInCart();
    containerCountProduct.innerHTML = countProduct;

    //пересохраняем массив товаров Корзины в localStorage
    save('onlineShop_cart', arrayCart);

    //перерисовываем корзину
    renderCart();
    
}


//увеличение количества одного товара (максимум до наличия)
function plusProduct(id){

    //получаем количество в наличии данного товара
    let inStock = event.target.getAttribute('quantity');
    //бежим по корзине и сравниваем Id в корзине и id увеличиваемго товара
    for(let i = 0; i < arrayCart.length; i++){
        if (arrayCart[i]['id'] == id) {
            //добавляем только в случае, если товар ещё есть в наличии
            if (inStock >= (arrayCart[i]['count']+1)){
                arrayCart[i]['count'] = arrayCart[i]['count'] + 1;
            }
            break;
        }
    }

    //пересчитываем общее количество товаров в корзине и перерисвываем в кружочке
    countProduct = countProductInCart();
    containerCountProduct.innerHTML = countProduct;

    //пересохраняем массив товаров Корзины в localStorage
    save('onlineShop_cart', arrayCart);

    //перерисовываем корзину
    renderCart();
}


//-------------------------- LOGIN -----------------------------//



//функция отрисовки логин окна
function renderLogin() {

    //очищаем страницу
    sort = -1;
    clearPage();

    //отрисовываем шаблон login
    containerPage.innerHTML += templateLogin;
    
    const signInBtn = document.querySelector('.signin-btn');
    const signUpBtn = document.querySelector('.signup-btn');
    const formBox = document.querySelector('.form-box');
    const mainBlock = document.querySelector('.mainBlock');

    signUpBtn.addEventListener('click', function(){
        formBox.classList.add('active');
        mainBlock.classList.add('active');
    });
    
    signInBtn.addEventListener('click', function(){
        formBox.classList.remove('active');
        mainBlock.classList.remove('active');
    });
    document.querySelector('.form_signin')
            .querySelector('button')
            .onclick = function() {
                userAuthorization()
            };

}


//функция регистрации
function userRegistration(){
    let userName = event.target.closest(".form_signup").querySelector('.user-name').value;
    let userMail = event.target.closest(".form_signup").querySelector('.user-mail').value;
    let user_pass1 = event.target.closest(".form_signup").querySelector('.user-pass1').value;
    let user_pass2 = event.target.closest(".form_signup").querySelector('.user-pass2').value;

if(user_pass1 !== user_pass2){
    alert('пароли не совпадают');
    return;
}
    let params = "user_name=" + userName + "&user_mail=" + userMail + "&password=" + user_pass1;
    url = "http://localhost/auth/signup/"
    let requestObj = new XMLHttpRequest();
    requestObj.open('POST', url, false);
    requestObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    requestObj.send(params);
    alert("отправил");
}

function userAuthorization(){
    alert('вхожу');
    event.preventDefault(); //предотвратить дефолтные действия, отмена отправки формы

    //найти все инпуты и получить данные из каждого
    let inputs = event.target.closest('form').querySelectorAll('input');
    console.log(inputs);

    let login = inputs[0].value;
    let password = inputs[1].value;

    //подставить в запрос и отправить
    let params = "user_name=" + login + "&password=" + password;
    url = "http://localhost/auth/login/";
    let requestObj = new XMLHttpRequest();
    requestObj.open('POST', url, false);
    requestObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    requestObj.send(params);

}
