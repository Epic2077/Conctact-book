let users = [];
let index = 0;

const userAmounts = () => {
  if (users.length === 0) {
    document.getElementById("contact").textContent = "No Contacts";
  } else {
    document.getElementById("amount").textContent = users.length;
  }
};

function showPpl() {
  for (let i = 0; i < users.length; i++) {
    let user = users[index];
    let avatar = document.getElementById("p-name");
    let divOne = document.createElement("div");
    divOne.classList.add("p-flex");
    divOne.innerHTML = `<div class="circle"><img src="${user.Avatar}" width="max-content" /></div>
     <p class="p-f-name">${user.FirsName} ${user.LastName}</p>`;
    avatar.append(divOne);
    index++;
  }
}
function showNumber() {
  let avatar = document.getElementById("p-phone");
  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    let divOne = document.createElement("p");
    divOne.classList.add("p-number");
    divOne.innerHTML = `${user.Number}`;
    avatar.append(divOne);
  }
}

const desplayUsers = () => {
  if (users.length === 0) {
    document.getElementById("user").innerHTML = "No contacts found!";
  } else {
    showPpl();
  }
};

fetch("https://671cf16209103098807bb538.mockapi.io/Users")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`network response was not ok`);
    }
    return response.json();
  })
  .then((data) => {
    users = data;
    userAmounts();
    desplayUsers();
    showNumber();
  });
