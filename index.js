let arr;

const generateContent = (item) => {
    document.getElementById('cocktailsContainer').innerHTML +=
            `<div class="card m-3 cocktail-card" id="cocktail-${item.id}">
                <img class="card-img-top cocktails-img"
                    src="${item.link}" alt="${item.name}">
                <h5 class="card-title cocktails-name" onclick="show(${item.id})">${item.name}</h5>
                <button type="button" class="btn btn-primary btn-like">&hearts;</button>
            </div>`;
}

const mappedCocktail = (drink, i) => {
    return {
        "id": i++,
        "name": drink.strDrink,
        "link": drink.strDrinkThumb,
        "descr": drink.strInstructions,
        "ingridients": [{"ingridient": drink.strIngredient1, "measure": drink.strMeasure1}, {"ingridient": drink.strIngredient2, "measure": drink.strMeasure2}, {"ingridient": drink.strIngredient3, "measure": drink.strMeasure3}, {"ingridient": drink.strIngredient4, "measure": drink.strMeasure4}, {"ingridient": drink.strIngredient5, "measure": drink.strMeasure5}, {"ingridient": drink.strIngredient6, "measure": drink.strMeasure6}, {"ingridient": drink.strIngredient7, "measure": drink.strMeasure7}, {"ingridient": drink.strIngredient8, "measure": drink.strMeasure8}, {"ingridient": drink.strIngredient9, "measure": drink.strMeasure9}, {"ingridient": drink.strIngredient10, "measure": drink.strMeasure10}, {"ingridient": drink.strIngredient11, "measure": drink.strMeasure11}, {"ingridient": drink.strIngredient12, "measure": drink.strMeasure12}, {"ingridient": drink.strIngredient13, "measure": drink.strMeasure13}, {"ingridient": drink.strIngredient14, "measure": drink.strMeasure14}, {"ingridient": drink.strIngredient15, "measure": drink.strMeasure15}]
    };
}

function generateCocktails() {
    clearErrorMessage();

    document.getElementById("search").value = "";
    fetch('cocktails.json')
    .then(response => response.json())
    .then(cocktails => {
        // сокращаем массив коктейлей, если у девайса ширина экрана меньше 768px
        cutCocktailsArray(cocktails);

        // создаем сокращенный массив объектов с нужными свойствами
        let cocktailsArr = cocktails.map(mappedCocktail);

        // выводим на страницу коктейли
        cocktailsArr.forEach(generateContent);
        arr = cocktailsArr;
    })
    .catch(err => console.log(err));
}

function searchCoctailsResult() {
    clearErrorMessage();
    let search = document.getElementById("search").value; //Б) получаем данные с сервера , отображаем , сохраняем в локал сторидж результат поиска
    
    if (search == "" || search == " ") return showErrorMessage();

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
    .then(response => response.json())
    .then(result => {
        if (result.drinks == null) showErrorMessage();
        
        // маппим массив найденных коктейлей
        let searchedCocktails = result.drinks.map(mappedCocktail);

        //вставляем на страницу результаты отмапленного поиска (функция непосредственно ставляющая находиться выше)
        searchedCocktails.forEach(generateContent); // функция generateContent написана выше 
        arr = searchedCocktails;
    })
    .catch(error => console.log(error) );
}

// сокращаем массив коктейлей из json, если ширина экрана меньше 768px
function cutCocktailsArray(array) {
    if (window.screen.width <= 768) {
        return array.length -= 10;
    }
}

function showErrorMessage() {
    document.getElementById("cocktailsContainer").innerHTML = "";
    document.getElementById('errorMessage').classList.add('card', 'error-message');
    document.getElementById('errorMessage').innerText = "Unfortunately there is no such drink :(";
}

function clearErrorMessage() {
    document.getElementById("cocktailsContainer").innerHTML = "";
    document.getElementById('errorMessage').innerText = "";
    document.getElementById('errorMessage').classList.remove('card', 'error-message');
}

// при клике на название коктейля показываем рецепт с "обратной" стороны
function show(index) {
    document.getElementById("cocktail-" + index).style.width = "400px";

    document.getElementById("cocktail-" + index).innerHTML = 
    `<div id="info-${index}" class="card-info">
        <h5 class="card-title mt-2 text-center cocktails-name_black">${arr[index].name}</h5>
        <ul class="cocktail-list" id="list-${index}"></ul>
        <p class="card-text pl-3 pr-3 pb-0 text-justify">${arr[index].descr.slice(0, 1).toUpperCase() + arr[index].descr.slice(1).toLowerCase()}</p>
        <button type="button" class="close" aria-label="Close" onclick="unShow(${index})">
            <span class="button-close" aria-hidden="true">&times;</span>
        </button>
    </div>`;

    // добавляем ингредиенты
    addIngridients(index);
}

function addIngridients(index) {
    // проходимся по массиву ингридиентов каждого объекта
    arr[index].ingridients.forEach(drink => {
        // если пусто, то не добавляем
        if (drink.ingridient == null || drink.ingridient == "") return;
        
        let ingridient = drink.ingridient.slice(0, 1).toUpperCase() + drink.ingridient.slice(1).toLowerCase();

        let li = document.createElement("li");
        if (drink.measure == null || drink.measure == "") {
            li.innerText = ingridient;
        } else {
            li.innerText = ingridient + " " + "(" + drink.measure.trim() + ")";
        }
        document.getElementById("list-" + index).appendChild(li);
    });
}

// при закрытие рецепта возвращаем "лицевую" сторону карточки с картинкой и наванием
function unShow(index) {
    document.getElementById("cocktail-" + index).style.width = "300px";
    document.getElementById("cocktail-" + index).innerHTML = 
    `<img class="card-img-top cocktails-img" src="${arr[index].link}" alt="${arr[index].name}">
    <h5 class="card-title cocktails-name" onclick="show(${arr[index].id})">${arr[index].name}</h5>
    <button type="button" class="btn btn-primary btn-like">&hearts;</button>`;
}

document.addEventListener("DOMContentLoaded", function(e) {
    generateCocktails();
});





// -----------------------------------------registration start-------------------------------------------

let form = {}
//const regBtn = document.getElementById("regBtn");

        regBtn.onclick = function (e) {
            e.preventDefault();

            clearErr();

            let result = validateName() & validateEmail() & validatePassword() & validateTerms() & validateNews();

            if (result) {

                //document.getElementById("error").innerHTML = "Спасибо за регистрацию!";

                document.getElementById('modal-footer').innerHTML = '';
                let str = ''
                str += `<button id="sendBtn2" class="btn btn-success" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal"
                        data-bs-dismiss="modal">Success! Send!</button>`
                document.getElementById('modal-footer').innerHTML = str;
            } else {
                document.getElementById('modal-footer').innerHTML = '';
                let err = ''
                err += `<button id="sendBtn2" type="button" class="btn btn-danger">Error! Fix it!</button>`
                document.getElementById('modal-footer').innerHTML = err;

                btn2();
            }
        }

        const btn2 = () => {
            sendBtn2.onclick = function (e) {
                e.preventDefault();

                clearErr();

                let result = validateName() & validateEmail() & validatePassword() & validateTerms() &
                    validateNews();

                if (result) {
                    document.getElementById('modal-footer').innerHTML = '';
                    let str = ''
                    str += `<button id="sendBtn2" class="btn btn-success" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal"
                        data-bs-dismiss="modal">Success! Send!</button>`
                    document.getElementById('modal-footer').innerHTML = str;
                }
            }
        }

        const clearErr = () => {
            document.getElementById("error").innerHTML = '';
            document.getElementById("nameErr").innerHTML = '';
            document.getElementById("emailErr").innerHTML = '';
            document.getElementById("passwordErr").innerHTML = '';
            document.getElementById("passwordErr2").innerHTML = '';
            document.getElementById("policyErr").innerHTML = '';
        }

        function validateName() {
            let name = document.getElementById("name").value;
            if (name === "") {
                document.getElementById("nameErr").innerHTML = "The name is not filled in<br>";
                return false;
            } else if (name.length < 2) {
                document.getElementById("nameErr").innerHTML = "The name must contain at least 2 characters<br>";
                return false;
            } else {
                form.name = name;
                return true;
            };
        }

        function validateEmail() {
            let email = document.getElementById("email").value;
            let emailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
            if (email === "") {
                document.getElementById("emailErr").innerHTML = "Email address is blank<br>";
                return false;
            } else if (email.match(emailFormat)) {
                form.email = email;
                return true;
            } else {
                document.getElementById("emailErr").innerHTML = "The email address is invalid<br>";
                return false;
            }
        }

        function validatePassword() {
            let password = document.getElementById("password").value;
            let retype = document.getElementById("retype_password").value;
            let passwordFormat = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;
            if (password === "") {
                document.getElementById("passwordErr").innerHTML = "Password is not filled<br>";
                return false;
            } else if (password.match(passwordFormat)) {
                if (password !== retype) {
                    document.getElementById("passwordErr2").innerHTML = "Password mismatch<br>";
                    return false;
                } else {
                    form.password = password;
                    return true;
                };
            } else {
                document.getElementById("passwordErr").innerHTML =
                    "Password must be in English and contain at least 6 characters, 1 uppercase letter, 1 lowercase and 1 number without spaces<br>";
                return false;
            }
        }

        function validateTerms() {
            let terms = document.getElementById("policy");
            if (!terms.checked) {
                document.getElementById("policyErr").innerHTML =
                    "Accept the User Agreement for registration<br>";
                return false;
            } else {
                form.terms = terms.checked;
                return true;
            };
        }

        function validateNews() {
            let newsletter = document.getElementById("newsletter");
            form.newsletter = newsletter.checked;
            return true;
        }

        // -----------------------------------------registration end-------------------------------------------

