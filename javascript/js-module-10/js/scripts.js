"use strict";

const resultGet = document.querySelector(".js-result-get");
const btnGet = document.querySelector(".js-btn-get");

btnGet.addEventListener("click", getAllUsers);

function getAllUsers() {
  fetch("https://test-users-api.herokuapp.com/users")
    .then(response => {
      if (response.ok) return response.json();
      throw new Error("Error fetching data");
    })
    .then(dates => {
      console.log("data inside then: ", dates);
      const ever = dates.data.reduce(
        (acc, user) => acc + `<li>${user.id} | ${user.name} | ${user.age}</li>`,
        ""
      );
      resultGet.innerHTML = ever;
    })
    .catch(error => console.error("ERROR" + error));
}

const inputGetId = document.querySelector(".js-input-get-id");
const resultGetId = document.querySelector(".js-result-get-id");
const btnGetId = document.querySelector(".js-btn-get-id");

btnGetId.addEventListener("click", getUserById);

function getUserById() {
  fetch(`https://test-users-api.herokuapp.com/users/${inputGetId.value}`)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error("Error fetching data");
    })
    .then(dates => {
      console.log("data inside then: ", dates);
      const everId = `<li>${dates.data.id} | ${dates.data.name} | ${
        dates.data.age
      }</li>`;

      resultGetId.innerHTML = everId;
    })
    .catch(error => {
      resultGetId.innerHTML = "Такого пользователя в списке нет!";
      console.error("ERROR" + error);
    });
}

const inputName = document.querySelector(".js-input-name");
const inputAge = document.querySelector(".js-input-age");
const postBtn = document.querySelector(".js-btn-post");
const resultUser = document.querySelector(".js-result-user");

postBtn.addEventListener("click", addUserName);

function addUserName() {
  fetch("https://test-users-api.herokuapp.com/users", {
    method: "POST",
    body: JSON.stringify({ name: inputName.value, age: inputAge.value }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (response.ok) return response.json();
      throw new Error("Error fetching data");
    })
    .then(dates => {
      console.log("data inside then: ", dates);
      let everUser = `<li>${dates.data._id} | ${dates.data.name} | ${
        dates.data.age
      }</li>`;
      resultUser.innerHTML = everUser;
    })
    .catch(error => console.error("ERROR" + error));
}

const inputRemove = document.querySelector(".js-input-remove-id");
const removeBtn = document.querySelector(".js-btn-remove-id");
const resultUserDel = document.querySelector(".js-result-remove-id");

removeBtn.addEventListener("click", removeUser);

function removeUser() {
  fetch(`https://test-users-api.herokuapp.com/users/${inputRemove.value}`, {
    method: "DELETE"
  })
    .then(response => {
      if (response.ok) return response.json();
      throw new Error("Error fetching data");
    })
    .then(dates => {
      console.log("data inside then: ", dates);
      let everDel = `<li>${dates.data.id} | ${dates.data.name} | ${
        dates.data.age
      }</li>`;
      resultUserDel.innerHTML = everDel;
    })
    .catch(error => { 
      resultUserDel.innerHTML = "Такого пользователя в списке нет!";
      console.error("ERROR" + error)});
}

const inputIdUpdate = document.querySelector(".js-input-id-update");
const inputNameUpdate = document.querySelector(".js-input-name-update");
const inputAgeUpdate = document.querySelector(".js-input-age-update");
const updateBtn = document.querySelector(".js-btn-update");
const resultUserUpdate = document.querySelector(".js-result-user-update");

updateBtn.addEventListener("click", updateUser);

function updateUser() {
  fetch(`https://test-users-api.herokuapp.com/users/${inputIdUpdate.value}`, {
    method: "PUT",
    body: JSON.stringify({
      name: inputNameUpdate.value,
      age: inputAgeUpdate.value
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (response.ok) return response.json();
      throw new Error("Error fetching data");
    })
    .then(dates => {
      console.log("data inside then: ", dates);
      let everUpdate = `<li>${dates.data.id} | ${dates.data.name} | ${
        dates.data.age
      }</li>`;
      resultUserUpdate.innerHTML = everUpdate;
    })
    .catch(error => {
      resultUserUpdate.innerHTML = "Такого пользователя в списке нет!";
      console.error("ERROR" + error)});
}
