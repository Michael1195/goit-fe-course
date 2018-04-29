// var arrNumber = [];
// var amount = 0;
// do {
//   var enterNumber = prompt("Введите число:");

//   if (isNaN(enterNumber)) {
//     alert("Было введено не число, попробуйте еще раз");
//   } else {
//     arrNumber.push(enterNumber);
//   }
// } while (enterNumber !== null);

// for (var numbers of arrNumber) {
//   amount += Number(numbers);
// }

// console.log(arrNumber);
// alert(`Общая сумма чисел равна ${amount}`);




const passwords = ["qwerty", "111qwe", "123123", "r4nd0mp4zzw0rd"];

for (var max = 3; max >= 1; ) {
  var enterPassword = prompt("Введите свой пароль:");

  for (var searchPassword of passwords) {
    if (enterPassword === searchPassword) {
      alert("Добро пожаловать!");
      break;
    }
  }
  if (enterPassword === searchPassword) {
    break;
  } else if (enterPassword === null) {
    break;
  } else if (max === 1) {
    alert("У вас закончились попытки, аккаунт заблокирован!");
    break;
  } else {
    max -= 1;
    alert(`Неверный пароль, у вас осталось ${max} попыток`);
  }
}
