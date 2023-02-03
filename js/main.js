



//переменные для записи элементов HTML
let containerPage = document.getElementById('containerPage');

let templateCatalog = document.getElementById('tmpl-catalog').innerHTML;
let templateCard = document.getElementById('tmpl-card').innerHTML;
let templateDeliveryPay = document.getElementById('tmpl-deliveryPay').innerHTML;
let templateContacts = document.getElementById('tmpl-contacts').innerHTML;
let templateCart = document.getElementById('tmpl-cart').innerHTML;
//отрисуем при загрузке каталог путём вызова функции
renderCatalog();

//функция очистки страницы
function clearPage(){
    containerPage.innerHTML="";
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
    let data=JSON.parse(json);

    console.log(data);
    //используем шаблон html - tmpl-catalog для вывода на страницу всех товаров из API
    containerPage.style.backgroundColor="";
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
    let data=JSON.parse(json);
console.log(data);
console.log(data[0]['id']);
    /*вот это /{id}/g нужно для того, чтобы заменить ВСЕ найденные значения {id}, а не первое */
    containerPage.innerHTML += templateCatalog.replace('${id}', data[i]['id'])
                                            .replace('${title}', data[i]['product_name'])
                                            .replace('${photo}', data[i]['image'])
                                            .replace('${price}', data[i]['price'])
                                            .replace('{rate}', 'рейтинг')
                                            .replace('{count}', 'число')
                                            .replace('{description}', data[0]['product_description']);
                                   
  }