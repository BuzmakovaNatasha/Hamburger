'use strict';

class HamburgerCatalog {
    constructor(container = '.products') {
        this._container = container;
        this._goods = [];
        this._productObjects = [];

        this._fetchGoods();
        this._render();
        this.clicks();
    }

    _fetchGoods() {
        this._goods = [
            { id: 1, size: 'Маленький', price: 50, calories: 20, name: 's' },
            { id: 2, size: 'Большой', price: 100, calories: 40, name: 'b' },
        ];
    }

    _render() { // вставляем разметку в <div class="products"></div>
        const catalogBlock = document.querySelector(this._container);

        this._goods.forEach(good => {
            const productObject = new HamburgerItem(good);

            this._productObjects.push(productObject);
            catalogBlock.insertAdjacentHTML('beforeend', productObject.getHTMLString());
        });
    }

    clicks() {
        const btns = document.querySelectorAll('button');
        const inputs__small = document.querySelectorAll('.input__s'); // находим все input (для маленького гамбургера)
        const inputs__big = document.querySelectorAll('.input__b'); // находим все input (для большого гамбургера)
        let copyProductObjects = this._productObjects; // создала новую переменную, т.к. пока не поняла почему далее в функции не читается this._productObjects
        let fullPrice = 0;
        let fullCalories = 0;
        btns.forEach(function (button) {
            button.addEventListener('click', function (event) { // event.target - элемент, на котором был клик (какая-именно кнопка).
                if (event.target.getAttribute("data-id") == 1) {
                    fullPrice += copyProductObjects[0].price;
                    fullCalories += copyProductObjects[0].calories;
                    inputs__small.forEach(function (input) {
                        if (input.checked && input.classList.contains("input__cheese")) {
                            fullPrice += copyProductObjects[0].cheesePrice;
                            fullCalories += copyProductObjects[0].cheeseCalories;
                        }
                        if (input.checked && input.classList.contains("input__salad")) {
                            fullPrice += copyProductObjects[0].saladPrice;
                            fullCalories += copyProductObjects[0].saladCalories;
                        }
                        if (input.checked && input.classList.contains("input__potato")) {
                            fullPrice += copyProductObjects[0].potatoPrice;
                            fullCalories += copyProductObjects[0].potatoCalories;
                        }
                        if (input.checked && input.classList.contains("input__spice")) {
                            fullPrice += copyProductObjects[0].spicePrice;
                            fullCalories += copyProductObjects[0].spiceCalories;
                        }
                        if (input.checked && input.classList.contains("input__mayonnaise")) {
                            fullPrice += copyProductObjects[0].mayonnaisePrice;
                            fullCalories += copyProductObjects[0].mayonnaiseCalories;
                        }
                    });
                }
                if (event.target.getAttribute("data-id") == 2) {
                    fullPrice += copyProductObjects[1].price;
                    fullCalories += copyProductObjects[1].calories;
                    inputs__big.forEach(function (input) {
                        if (input.checked && input.classList.contains("input__cheese")) {
                            fullPrice += copyProductObjects[1].cheesePrice;
                            fullCalories += copyProductObjects[1].cheeseCalories;
                        }
                        if (input.checked && input.classList.contains("input__salad")) {
                            fullPrice += copyProductObjects[1].saladPrice;
                            fullCalories += copyProductObjects[1].saladCalories;
                        }
                        if (input.checked && input.classList.contains("input__potato")) {
                            fullPrice += copyProductObjects[1].potatoPrice;
                            fullCalories += copyProductObjects[1].potatoCalories;
                        }
                        if (input.checked && input.classList.contains("input__spice")) {
                            fullPrice += copyProductObjects[1].spicePrice;
                            fullCalories += copyProductObjects[1].spiceCalories;
                        }
                        if (input.checked && input.classList.contains("input__mayonnaise")) {
                            fullPrice += copyProductObjects[1].mayonnaisePrice;
                            fullCalories += copyProductObjects[1].mayonnaiseCalories;
                        }
                    });
                }
                alert(`Стоимость гамбургера: ${fullPrice}\nКалорийность гамбургера: ${fullCalories}`);
                fullPrice = 0;
                fullCalories = 0;
            });
        });

    }
}

class HamburgerItem {
    constructor(product, cheesePrice = 10, cheeseCalories = 20, saladPrice = 20, saladCalories = 5, potatoPrice = 15, potatoCalories = 10, spicePrice = 15, spiceCalories = 0, mayonnaisePrice = 20, mayonnaiseCalories = 5) {
        this.id = product.id;
        this.size = product.size;
        this.price = product.price;
        this.calories = product.calories;
        this.name = product.name;
        this.cheesePrice = cheesePrice;
        this.cheeseCalories = cheeseCalories;
        this.saladPrice = saladPrice;
        this.saladCalories = saladCalories;
        this.potatoPrice = potatoPrice;
        this.potatoCalories = potatoCalories;
        this.spicePrice = spicePrice;
        this.spiceCalories = spiceCalories;
        this.mayonnaisePrice = mayonnaisePrice;
        this.mayonnaiseCalories = mayonnaiseCalories;
    }

    getHTMLString() {
        return `<div class="products__item data-id='${this.id}'">
                    <h3>${this.size}</h3>
                    <p class="price">${this.price} &#8381</p>
                    <p class="calories">${this.calories} калорий</p>
                    <div class="filling">
                        <p class="filling__text">Выбирите одну начинку:</p>
                        <label><input class="input__${this.name} input__cheese" type="radio" name="${this.name}" checked> сыр (+${this.cheesePrice} &#8381, +${this.cheeseCalories} калорий)</label>
                        <label><input class="input__${this.name} input__salad" type="radio" name="${this.name}"> салат (+${this.saladPrice} &#8381, +${this.saladCalories} калорий)</label>
                        <label><input class="input__${this.name} input__potato" type="radio" name="${this.name}"> картофель (+${this.potatoPrice} &#8381, +${this.potatoCalories} калорий)</label>
                    </div>
                    <div class="filling">
                        <p class="filling__text">Дополнительно можно:</p>
                        <label>
                            <input class="input__${this.name} input__spice" type="checkbox" name="spice"> Посыпать приправой (+${this.spicePrice} &#8381, +${this.spiceCalories} калорий)
                        </label>
                        <label>
                            <input class="input__${this.name} input__mayonnaise" type="checkbox" name="mayonnaise"> Полить майонезом (+${this.mayonnaisePrice} &#8381, +${this.mayonnaiseCalories} калорий)
                        </label>
                    </div>
                    <button data-id="${this.id}">Рассчитать стоимость и калорийность гамбургера</button>
                </div>`;
    }
}

const hamburger = new HamburgerCatalog();