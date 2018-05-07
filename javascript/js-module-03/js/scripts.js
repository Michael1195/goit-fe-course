const checkIfLoginExists = function(logins, login) {
  return logins.includes(login);
};

const checkLoginValidity = function(login) {
  if (login.length >= 4 && login.length <= 16) {
    return true;
  } else {
    return false;
  }
};

const addLogin = function(logins, login) {
  let checkLogin = checkLoginValidity(login);

  if (checkLogin === false) {
    return alert("Ошибка! Логин должен быть от 4 до 16 символов");
  }

  let checkifLogin = checkIfLoginExists(logins, login);

  if (checkifLogin === true) {
    return alert("Такой логин уже используется!");
  } else {
    logins.push(login);
    return alert("Логин успешно добавлен!");
  }
};

const logins = ["Mango", "robotGoogles", "Poly", "Aj4x1sBozz", "qwerty123"];
const login = prompt("Введите логин:");
addLogin(logins, login);
