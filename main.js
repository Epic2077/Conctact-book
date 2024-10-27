let users = [];
let index = 0;

const userAmounts = () => {
  if (users.length === 0) {
    document.getElementById("contact").textContent = "No Contacts";
  } else {
    document.getElementById("amount").textContent = users.length;
  }
};

function showPpl(filteredUsers = users) {
  const avatar = document.getElementById("p-name");
  avatar.innerHTML = ""; // Clear existing content before appending

  filteredUsers.forEach((user) => {
    let divOne = document.createElement("div");
    divOne.classList.add("p-flex");

    // Get the first letter of the first name
    const firstLetter = user.FirsName ? user.FirsName[0] : "?";

    // Add an image with an onerror fallback
    divOne.innerHTML = `
      <div class="circle">
        <img src="${user.Avatar}" width="max-content" onerror="this.style.display='none'; this.parentElement.innerHTML = '<p>${firstLetter}</p>'" />
      </div>
      <p class="p-f-name">${user.FirsName} ${user.LastName}</p>
    `;
    avatar.append(divOne);
  });
}

function showNumber(filteredUsers = users) {
  const phoneContainer = document.getElementById("p-phone");
  phoneContainer.innerHTML = ""; // Clear existing content before appending

  filteredUsers.forEach((user) => {
    let phoneNumber = user.Number;
    let cleanNumber = phoneNumber.split("x")[0].trim();
    let divOne = document.createElement("p");
    divOne.classList.add("p-number");
    divOne.classList.add("p-flex");
    divOne.textContent = `${cleanNumber}`;
    phoneContainer.append(divOne);
  });
}

const desplayUsers = (filteredUsers = users) => {
  if (filteredUsers.length === 0) {
    document.getElementById("user").innerHTML = "No contacts found!";
  } else {
    showPpl(filteredUsers);
    showNumber(filteredUsers);
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
  })
  .catch((error) => {
    console.error("Error fetching users:", error);
  });

function searchSystem() {
  let query = document.getElementById("search").value.toLowerCase();
  let matchingUsers = users.filter((user) => {
    let firstName = user.FirsName.toLowerCase();
    let lastName = user.LastName.toLowerCase();
    let fullName = `${firstName} ${lastName}`;
    let number = user.Number;

    return (
      firstName.includes(query) ||
      lastName.includes(query) ||
      fullName.includes(query) ||
      number.includes(query)
    );
  });

  // Display the matched users
  desplayUsers(matchingUsers);
}

// Attach the search system to the search input
document.getElementById("search").addEventListener("input", searchSystem);
