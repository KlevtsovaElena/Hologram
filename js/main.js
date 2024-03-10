
let catalog =  [
    {
        "id": 1,
        "title": "Название голограммы",
        "price": 100,
        "description": "Описание голограммы",
        "image": "img/dinosaurs.jpg"
    },
    {
        "id": 2,
        "title": "Длинное название голограммы",
        "price": 100,
        "description": "Описание голограммы",
        "image": "img/dinosaurs.jpg"
    },
    {
        "id": 3,
        "title": "Название голограммы",
        "price": 100,
        "description": "Описание голограммы",
        "image": "img/dinosaurs.jpg"
    },
    {
        "id": 4,
        "title": "Название голограммы",
        "price": 100,
        "description": "Описание голограммы",
        "image": "img/dinosaurs.jpg"
    },
    {
        "id": 5,
        "title": "Название голограммы",
        "price": 100,
        "description": "Описание голограммы",
        "image": "img/dinosaurs.jpg"
    },
    {
        "id": 6,
        "title": "Название голограммы",
        "price": 100,
        "description": "Описание голограммы",
        "image": "img/dinosaurs.jpg"
    },
    {
        "id": 7,
        "title": "Название голограммы",
        "price": 100,
        "description": "Описание голограммы",
        "image": "img/dinosaurs.jpg"
    },
    {
        "id": 8,
        "title": "Название голограммы",
        "price": 100,
        "description": "Описание голограммы",
        "image": "img/dinosaurs.jpg"
    }
]



//создаём пустой массив для записи товаров в корзину И избранное, переменную для подсчёта товаров в корзине. Точнее id товаров
let arrayCart = localStorage.getItem('cart');

//если нет сохранённого, то создаём новые переменные. 
if (arrayCart == null){
    arrayCart = new Array();
}else {arrayCart = JSON.parse(arrayCart);}

//переменные для записи элементов HTML
let containerPage = document.querySelector('.catalog__cards');
let favoritePage = document.querySelector('.favorite-page__cards');
let cardPage = document.querySelector('.card-page__card');

let templateCatalog = document.getElementById('tmpl-catalog').innerHTML;
let templateCard = document.getElementById('tmpl-card').innerHTML;

//отрисуем при загрузке каталог путём вызова функции
if (containerPage) {
    renderCatalog();
}

if (favoritePage) {
    renderFavorite();
}

if (cardPage) {
    renderCard(1);
}

//для сохранения данных в localStorage
function save(keyData, saveData){
    //кодируем data в json и сохраняем в localStorage
    let dataJson = JSON.stringify(saveData);

    //сохраняем в localStorage
    localStorage.setItem(keyData, dataJson);
}

  //функция отрисовки каталога
  function renderCatalog(){
    //получаем данные каталога
    let json = catalog;
    //раскодируем данные
    let data=json;

    //используем шаблон html - tmpl-catalog для вывода на страницу всех товаров 
     for (let i = 0; i < data.length; i++){   
        containerPage.innerHTML += templateCatalog.replace(/{id}/g, data[i]['id'])
                                                  .replace(/{title}/g, data[i]['title'])
                                                  .replace('{image}', data[i]['image'])
                                                  .replace('{price}', data[i]['price']);
     }
    /*здесь проходимся по массиву товаров в Корзине. Если они есть в ней , то
    то кнопку 'В корзину' этих элемннтов скрыть, а кнопку 'Удалить' - показать*/
     for (let i = 0; i < arrayCart.length; i++){
        document.getElementById('cart'+ arrayCart[i]).classList.add('d-none');
        document.getElementById('cart'+ arrayCart[i] +'Delete').classList.add('d-iblock');
     }

 }

   //функция отрисовки каталога Избранного
   function renderFavorite(){
    //получаем данные каталога
    let json = catalog;
    //раскодируем данные
    let data=json;
    //получаем данные избранного из локал сторедж
    let arrayCart = localStorage.getItem('cart');

    if (arrayCart == null){
        arrayCart = new Array();
    }else {arrayCart = JSON.parse(arrayCart);}




console.log(arrayCart);
console.log(arrayCart.length);
    //используем шаблон html - tmpl-catalog для вывода на страницу всех товаров из API
    // containerPage.style.backgroundColor="";
    for (let i = 0; i < arrayCart.length; i++){ 
        console.log(arrayCart[i]);
        for (let j = 0; j < data.length; j++){
            console.log(i, j);
            if (arrayCart[i] == data[j]["id"]) {
                console.log(arrayCart[i]);

                favoritePage.innerHTML += templateCatalog.replace(/{id}/g, data[j]["id"])
                                            .replace(/{title}/g, data[j]['title'])
                                            .replace('{image}', data[j]['image'])
                                            .replace('{price}', data[j]['price']);
                
                                            document.getElementById('cart'+ arrayCart[i]).classList.add('d-none');
                                            document.getElementById('cart'+ arrayCart[i] +'Delete').classList.add('d-iblock');

               break;
            }
        }
        


        // 
     }

 }


   //функция отрисовки карточки
 function renderCard(id){

    //получаем данные одного товара по id
    let json = catalog;
    //раскодируем данные
    let data=json;

    /*вот это /{id}/g нужно для того, чтобы заменить ВСЕ найденные значения {id}, а не первое */
    for (let i = 0; i < data.length; i++){ 
        console.log(data[i]['id']);
        if(data[i]['id']==id) {
            cardPage.innerHTML += templateCard.replace(/{id}/g, data[i]['id'])
                                                .replace(/{title}/g, data[i]['title'])
                                                .replace('{image}', data[i]['image'])
                                                .replace('{price}', data[i]['price'])
                                                .replace('{description}', data[i]['description']);
                                                break
        }

    }
   /*здесь проверяем, есть ли в массиве Корзины элемент со значением id, кторый передали в эту функцию
    indexOf(String(id)) - если есть - вернётся >0 (индекс элеента в массиве.)
    String(id) нужен для того, чтобы ЧИСЛО id  преобразовать в СТРОКУ (напр, 3 в '3').
    ИТОГ: если есть элемент в корзине, то кнопку 'В корзину' скрыть, а кнопку 'Удалить' - показать*/
    if (arrayCart.indexOf(String(id)) >= 0){
            document.getElementById('cart'+ id).classList.add('d-none');
            document.getElementById('cart'+ id +'Delete').classList.add('d-iblock');
    }  
                              
  }



/*при нажатии появляется-исчезает красное сердечко, типо добавили-убрали в избранное*/
//  function hiddenHeart(){
//      let idElement = event.target.id+"Red";
//      let id = event.target.id.replace('heart', '');
//      event.target.style.display="none";
//      document.getElementById(idElement).style.display="inline-block";
//      arrayHeart.push(id); 
//      save('heart', arrayHeart);
//  }
//  function hiddenHeartRed(){
//      let idElement = event.target.id.replace("Red", "");
//      let id=idElement.replace('heart', '');
//      event.target.style.display="none";
//      document.getElementById(idElement).style.display="inline-block";
//      arrayHeart.splice(arrayHeart.indexOf(id), 1);
//      save('heart', arrayHeart);
//  }
















/*  при нажатии меняется кнопка Корзины(добавить-удалить) и 
 идёт подсчёт товаров в Корзине (отображается в красном кружке)*/
/*настроен только счётчик, функционала записи наименований товаров нет*/
 function hiddenCartAdd(){
     let idElement = event.target.id+"Delete";
     let id=event.target.id.replace('cart', '');
     event.target.style.display="none";
     document.getElementById(idElement).style.display="inline-block";
     arrayCart.push(id);
    save('cart', arrayCart);

 }
 function hiddenCartDelete(){
     let idElement = event.target.id.replace("Delete", "");
     let id=idElement.replace('cart', '');
     event.target.style.display="none";
     document.getElementById(idElement).style.display="inline-block";
     arrayCart.splice(arrayCart.indexOf(id), 1);
     save('cart', arrayCart);
 }



