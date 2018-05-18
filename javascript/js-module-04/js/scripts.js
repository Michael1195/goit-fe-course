"use strict";

const products = {
  bread: 10,
  milk: 15,
  apples: 20,
  chicken: 50,
  pork: 80,
  cheese: 60,
  tea: 20,
  candy: 25
};

function Cashier(name, products) {
  let totalPrice = 0;
  let customerMoney = 0;
  let changeAmount = 0;
  this.name = name;
  this.products = products;

  this.countTotalPrice = function(order) {
    let ord = Object.keys(order);
    let prod = Object.keys(this.products);
    for (let i of ord) {
      if (prod.includes(i)) {
        totalPrice += this.products[i] * order[i];
      }
    }
  };

  this.getCustomerMoney = function() {
    do {
      customerMoney = prompt(
        `Общая стоимость покупок ${this.name}: ${totalPrice}`
      );
    } while (customerMoney !== null && customerMoney < totalPrice);
  };

  this.countChange = function() {
    changeAmount = customerMoney - totalPrice;
  };

  this.reset = function() {
    totalPrice = 0;
    customerMoney = 0;
    changeAmount = 0;
  };

  this.serve = function(order) {
    this.countTotalPrice(order);
    this.getCustomerMoney();

    if (customerMoney >= totalPrice) {
      this.countChange();
      alert(`Спасибо за покупку, ваша сдача ${changeAmount}`);
    } else {
      alert(`Очень жаль, что-то пошло не так, приходите еще`);
    }

    this.reset();
  };
}

const order = {
  bread: 2,
  milk: 2,
  apples: 1,
  cheese: 1
};

const cashier = new Cashier("Mango", products);

cashier.serve(order);
