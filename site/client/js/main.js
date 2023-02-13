
//создаём переменные  для записи товаров в корзину И избранное, переменную для подсчёта товаров в корзине. Точнее id товаров
//и записываем в них значения localStorage
let arrayCart = window.localStorage.getItem('onlineShop_cart');
let arrayFavorite = window.localStorage.getItem('onlineShop_favorite');

let countProduct;


//если нет сохранённого, то создаём новые переменные. 
if (arrayCart == null || arrayCart == 'null' || arrayCart == ''){
    arrayCart = new Array();
}else {arrayCart = JSON.parse(arrayCart);}


function countProductInCart(){
    countProduct = 0;
    for (let i = 0;  i < arrayCart.length; i++){
        countProduct += arrayCart[i]['count']; 
    }
    return countProduct;
}

countProductInCart();

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
const templateCartEmpty = document.getElementById('tmpl-cart-empty').innerHTML;

//let templateDeliveryPay = document.getElementById('tmpl-deliveryPay').innerHTML;
//let templateContacts = document.getElementById('tmpl-contacts').innerHTML;

//впишем в красный круг корзины количество товаров из переменной countProduct
containerCountProduct.innerHTML = countProduct;

//отрисуем при загрузке Главную страницу путём вызова функции
renderMainPage();

//проверка
console.log(arrayCart);


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


//функция для отправки запросов GET
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
    let json = sendRequestGET('http://localhost/api/get/?table=goods');
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
                                                    .replace('${price}', data[i]['price'])
                                                    .replace('${шт}', data[i]['quantity']);
        }
}   


//функция отрисовки карточки
function renderCard(id){

    clearPage();

    //получаем данные одного товара по id
    let json = sendRequestGET('http://localhost/api/get/?table=goods&id=' + id);
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

//добавление товара в корзину (записываем в ls только id)
function addProductInCart(){

    //определяем на кнопку какого товара нажали (его id)
    let productId = event.target.getAttribute('product-id');
    let inStock = event.target.getAttribute('quantity');



    //получим только id корзины
    let idArrayCart = getValueField(arrayCart, 'id');

    //
    let indexElement = idArrayCart.indexOf(productId);

    if (indexElement == -1){
        arrayCart.push({'id': productId, 'count': 1}); 
    } else {
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
function renderCart(){
    clearPage();

    if (arrayCart.length==0){
        containerPage.innerHTML = templateCartEmpty;
        return;
    }
    // //получим только id корзины

    let idArrayCart = getValueField(arrayCart, 'id');
    let id = idArrayCart.join(',');


    let json = sendRequestGET('http://localhost/api/get/?table=goods&id=' + id);
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
    

    containerPage.innerHTML += templateCart.replace('${count}', countProduct)
                                            .replace('${countSum}', price)
                                            .replace('${watchCards}', watchCards);
 }

//
function deleteProductCart(id){
    let ok = confirm("Удалить из корзины этот товар?");  //true / false
    if(ok==false){
        return;
    }            
    for (let i = 0;  i < arrayCart.length; i++){
        if (arrayCart[i]['id'] == id) {
            arrayCart.splice(i, 1);
            break;
        }
    }
    countProduct = countProductInCart();
    containerCountProduct.innerHTML = countProduct;
    //пересохраняем массив товаров Корзины в localStorage
    save('onlineShop_cart', arrayCart);
renderCart();
}

function minusProduct(id){


    for(let i = 0; i < arrayCart.length; i++){
        if (arrayCart[i]['id'] == id) {
            if(arrayCart[i]['count']==1){
                return;
            }
            arrayCart[i]['count'] = arrayCart[i]['count']-1;
            break;
        }
    }
    countProduct = countProductInCart();
    containerCountProduct.innerHTML = countProduct;
    //пересохраняем массив товаров Корзины в localStorage
    save('onlineShop_cart', arrayCart);
    renderCart();
    
}

function plusProduct(id){
    let inStock = event.target.getAttribute('quantity');
    console.log(inStock);
    for(let i = 0; i < arrayCart.length; i++){
        if (arrayCart[i]['id'] == id) {
            if (inStock >= (arrayCart[i]['count']+1)){
                arrayCart[i]['count'] = arrayCart[i]['count'] + 1;
            }
            break;
        }
    }
    countProduct = countProductInCart();
    containerCountProduct.innerHTML = countProduct;
    //пересохраняем массив товаров Корзины в localStorage
    save('onlineShop_cart', arrayCart);
    renderCart();
}



//-------------------------- LOGIN -----------------------------//


const templateLogin = document.getElementById('tmpl-login').innerHTML;

//функция отрисовки логин окна
function renderLogin() {

    //очищаем страницу
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
}

//функция регистрации
function userRegistration(){
    let userName = event.target.closest(".form_signup").querySelector('.user-name').value;
    let userMail = event.target.closest(".form_signup").querySelector('.user-mail').value;
    let user_pass1 = event.target.closest(".form_signup").querySelector('.user-pass1').vale;

  let params = "user_name=" + userName + "&user_mail=" + userMail + "&password=" + user_pass1;
  url = "http://localhost/api/post/users.php"
  let requestObj = new XMLHttpRequest();
  requestObj.open('POST', url, false);
  requestObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  requestObj.send(params);
  alert("отправил");
}

//функция тестовая, запись в таблицу через js
function sendCartInBD(){
//функция для отправки запросов GET

    url = "http://localhost/api/post/goods.php"
    let requestObj = new XMLHttpRequest();
    requestObj.open('POST', url, false);
    requestObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    let param = "product_name=testjs2&price=600";
    requestObj.send(param);


}