function generateCocktailGif() {
    let tagValue = "cocktail";
    // формируем url для гифки
    let url = "https://api.giphy.com/v1/gifs/random?api_key=wpmnrpK88lFhCGl7bWHIOE40I01NAbyZ" + "&tag=" + tagValue + "&rating=g";

    fetch(url)
    .then(response => response.json())
    .then(result => {
        let gifCocktail = result.data.images.original;
        document.getElementById("gifImg").src = gifCocktail.url;
    })
    .catch(err => console.log(err));
}

function onSuccess(response) {
    document.getElementById("tost").innerHTML = response.result;
    // удаляем ссылку на сайт ржунемогу
    deleteTostLink();
}

function deleteTostLink() {
    let tostLink = document.querySelector('a[href="http://www.rzhunemogu.ru"]');
    tostLink.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function(e) {
    generateCocktailGif();
    getJSONP('http://www.RzhuNeMogu.ru/Widzh/WidzhRNM.aspx?type=6', onSuccess);
});

function close(){
    debugger;
    window.top.close();
}




// !!!!!!!!!!!!!!!!!!!!!!!! redeclaration CONST generateContent она уже есть в файле index.js !!!!!!!!!!!!!



 //добавляем (функция) контент в див "searched" на главной
// const generateContent = (item) => {
//     document.getElementById("searched").innerHTML += `<div class="col"> <div class="card h-100">
//                             <img src="${item.url}" class="card-img-top" alt="картинка">
//                             <div class="card-body">
//                                 <h5 class="card-title">${item.nameDrink}</h5>
//                                 <p class="card-text">${item.instruction}</p>
//                             </div>
//                             </div>
//                             </div>`;
// }





/* //1. функция для отображения дефолтных картинок при фходе на главную страницу
function showDefaultCoctails() {
    document.getElementById("searched").innerHTML = " "
    coctails.forEach(generateContent)
};  */ 
//получение и вывод результата поиска с сервера
function errorMessage(){    
    document.getElementById('errorMessage').innerHTML =`<p>К сожалению такого напитка нет :(</p>`} 

function searchCoctailsResult() {
    let search = document.getElementById("search").value; //Б) получаем данные с сервера , отображаем , сохраняем в локал сторидж результат поиска
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                //применяем map, чтобы сократить данные до необходимого минимума
                const mapData = (result) => {
                    return result && result.length ?
                        result.map(drink => {
                            return { // применяет логику к каждому элементу массива объектов, создавая новый объект с полями
                                url: drink.strDrinkThumb || " ", //drink = каждый  объект массива, называем сами, url - тоже
                                nameDrink: drink.strDrink || " ",
                                instruction: drink.strInstructions || " "
                            }
                        }) : ([], errorMessage())
                }
                /*console.log(mapData)*/
                const mappedData = mapData(result.drinks)
                console.log("mappedData", mappedData)

                //вставляем на страницу результаты отмапленного поиска (функция непосредственно ставляющая находиться выше)
                document.getElementById("searched").innerHTML = " "
                mappedData.forEach(generateContent); // функция generateContent написана выше 

            })
            .catch(error => console.log(error))
        }







//подготавливаем ингредиенты для вывода на странице
let coctailsArr = [];
let ingredients =[" Light rum ", " Applejack "," Gin "," Dark rum "," Sweet Vermouth "," Strawberry schnapps "," Scotch "," Apricot brandy "," Triple sec "," Southern Comfort "," Orange bitters "," Brandy "," Lemon vodka "," Blended whiskey "," Dry Vermouth "," Amaretto "," Tea "," Champagne "," Coffee liqueur "];                               
//console.log(ingredients);                       
// функция отображения
function makeCoctail(){
    showIngredients()
    getFromLocalStorage();
    generateCoctailsList(coctailsArr)
}
function showIngredients() {
    document.getElementById("ingredients").innerHTML = " "
    let  listOfIngredients = " ";
    ingredients.forEach((el) =>{
        listOfIngredients += `<div class="col"><input class="form-check-input" type = "checkbox" value = "${el}"> ${el} </input></div>
        </div></div>`    
    })
    document.getElementById("ingredients").innerHTML = listOfIngredients  
};
function createNewCoctail(){
    let selectedIngredients = document.querySelectorAll('input:checked');
    console.log("selectedIngredients",selectedIngredients);
    let ingredientsValues = Array.from(selectedIngredients).map(ingredient => ingredient.value);
    console.log(ingredientsValues);
    let coctailName = document.getElementById('name').value;
    console.log(coctailName);
    let coctail = {name:coctailName, ingredients:ingredientsValues}
    console.log(coctail);
    if(ingredientsValues.length&&coctailName != ""){
        coctailsArr.push(coctail);
    }
    if(!coctailName){
        document.getElementById("errorMessage").innerHTML="The name is necessary";
    }

    console.log(coctailsArr);
    saveToLocalStorage();
    generateCoctailsList(coctailsArr)
}

function generateCoctailsList(coctailsArr){  
    document.getElementById("myCoctails").innerHTML = " ";  
    let  coctailsContent = " ";
    coctailsArr.forEach(coctail => {          
        coctailsContent += `<div class="col"> <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title">${coctail.name}</h5>
                                <p class="card-text">${coctail.ingredients}</p>                            
                            </div>
                            </div>
                            </div>`;
    });
    document.getElementById("myCoctails").innerHTML = coctailsContent;
}

//2. чтобы не потерять в случае обновления - сохранить в локал сторидж
function saveToLocalStorage() {
    localStorage.setItem("LocalStorData", JSON.stringify(coctailsArr));
}


// 3. забрать из локал сторидж
function getFromLocalStorage() {
    if (localStorage.getItem("LocalStorData") != null) {
        coctailsArr = JSON.parse(localStorage.getItem("LocalStorData"));
    }
}


//changing in the personal account
function personalChange(){
    /*document.getElementById('search').value = " ";*/
    document.querySelector('#searched').style = "display:none;";
    debugger;
    if(document.querySelector('input[name=btnradio]:checked').value == 'calculator'){
        document.querySelector('.calculator').style = "display:block;";
        document.querySelector('.ownCocktails').style = "display:none;";
        document.querySelector('.favouriteCocktails').style = "display:none;";
    }
    else if (document.querySelector('input[name=btnradio]:checked').value == 'ownCocktails'){
        document.querySelector('.calculator').style = "display:none;";
        document.querySelector('.ownCocktails').style = "display:block;";
        document.querySelector('.favouriteCocktails').style = "display:none;";
        makeCoctail();
    }
    else if (document.querySelector('input[name=btnradio]:checked').value == 'favouriteCocktails'){
        document.querySelector('.calculator').style = "display:none;";
        document.querySelector('.ownCocktails').style = "display:none;";
        document.querySelector('.favouriteCocktails').style = "display:block;";
    }
}


//show favourite cocktails
document.addEventListener('DOMContentLoaded', show = ()=>{
    if (localStorage.getItem('favouriteCocktails') != null){
        list = localStorage.getItem('favouriteOcktails').split('|');

        list.forEach(element => {
            document.querySelector('.favouriteCocktails').innerHTML += `
            <a href="index.html/search ${element}" class="list-group-item list-group-item-action active">${element}</a>`
            }
        )

    }
})








// -----------------------------------------calculator start-------------------------------------------        
const calc = () => {
    const weight = document.querySelector('#weight').value;
    const height = document.querySelector('#height').value;
    const volume = document.querySelector('#volume').value;
    const strength = document.querySelector('#drinks option:checked').value;
    const sex = document.querySelector('input[name = "sex"]:checked').value;

    //let result = Math.round(volume * (strength*0.01) / (weight * sex));
    let result = +(Math.round(((volume * (strength * 0.01) / (weight * sex))) + "e+2") + "e-2");

    generateTable(weight, height, strength, volume, result);
}



const generateTable = (weight, height, strength, volume, result) => {
    document.getElementById('result').innerHTML = `<div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">#</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">Body weight (kg)</th>
                    <td>${weight}</td>
                </tr>
                <tr>
                    <th scope="row">Height (cm)</th>
                    <td>${height}</td>
                </tr>
                <tr>
                    <th scope="row">Alcohol strength(%)</th>
                    <td>${strength}</td>
                </tr>
                <tr>
                    <th scope="row">Quantity (ml)</th>
                    <td>${volume}</td>
                </tr>
                <tr>
                    <th class="table-danger" scope="row">Blood alcohol content (ppm)</th>
                    <td class="table-danger">${result}</td>
                </tr>
                </tr>
            </tbody>
        </table>
    </div>`
}

// -----------------------------------------calculator end-------------------------------------------  

