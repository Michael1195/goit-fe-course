"use strict";

class Hamburger {
  constructor(size, stuffing, toppings = []) {
    this.size = size;
    this.stuffing = stuffing;
    this.toppings = toppings;
  }

  // * Добавить topping к гамбургеру. Можно добавить несколько
  // * topping, при условии, что они разные.
  addTopping(topping) {
    if (!this.toppings.includes(topping)) {
      this.toppings.push(topping);
    }
  }

  //  * Убрать topping, при условии, что она ранее была добавлена
  removeTopping(topping) {
    return (this.toppings = this.toppings.filter(
      element => element !== topping
    ));
  }

  //  * Получить список toppings
  getToppings() {
    return this.toppings;
  }

  //  * Узнать размер гамбургера
  getSize() {
    return this.size;
  }

  //  * Узнать начинку гамбургера
  getStuffing() {
    return this.stuffing;
  }

  //  * Узнать цену гамбургера
  calculatePrice() {
    return (
      SIZES[this.size].price +
      STUFFINGS[this.stuffing].price +
      this.toppings.reduce((acc, val) => acc + TOPPINGS[val].price, 0)
    );
  }

  //  * Узнать калорийность
  calculateCalories() {
    return (
      SIZES[this.size].calories +
      STUFFINGS[this.stuffing].calories +
      this.toppings.reduce((acc, val) => acc + TOPPINGS[val].calories, 0)
    );
  }
}

const SIZE_SMALL = "SIZE_SMALL";

const SIZE_LARGE = "SIZE_LARGE";

const STUFFING_CHEESE = "STUFFING_CHEESE";

const STUFFING_SALAD = "STUFFING_SALAD";

const STUFFING_MEAT = "STUFFING_MEAT";

const TOPPING_SPICE = "TOPPING_SPICE";

const TOPPING_SAUCE = "TOPPING_SAUCE";

const SIZES = {
  SIZE_SMALL: {
    price: 30,
    calories: 50
  },

  SIZE_LARGE: {
    price: 50,
    calories: 100
  }
};

const STUFFINGS = {
  STUFFING_CHEESE: {
    price: 15,
    calories: 20
  },

  STUFFING_SALAD: {
    price: 20,
    calories: 5
  },

  STUFFING_MEAT: {
    price: 35,
    calories: 15
  }
};

const TOPPINGS = {
  TOPPING_SPICE: {
    price: 10,
    calories: 0
  },

  TOPPING_SAUCE: {
    price: 15,
    calories: 5
  }
};

const hamburger = new Hamburger(SIZE_SMALL, STUFFING_CHEESE);

console.log(hamburger);

// Добавка из приправы
hamburger.addTopping(TOPPING_SPICE);

// Спросим сколько там калорий
console.log("Calories: ", hamburger.calculateCalories());

// Сколько стоит?
console.log("Price: ", hamburger.calculatePrice());

// Я тут передумал и решил добавить еще соус
hamburger.addTopping(TOPPING_SAUCE);

// А теперь сколько калорий?
console.log("Calories with sauce: ", hamburger.calculateCalories());

// А сколько теперь стоит?
console.log("Price with sauce: ", hamburger.calculatePrice());

// Проверить, большой ли гамбургер?
console.log("Is hamburger large: ", hamburger.getSize() === SIZE_LARGE);

//Проверить какая начинка?
console.log("Stuffing: ", hamburger.getStuffing());

// Убрать добавку
hamburger.removeTopping(TOPPING_SPICE);

// Смотрим сколько добавок
console.log("Hamburger has %d toppings", hamburger.getToppings().length);
