document.addEventListener("DOMContentLoaded", () => {
  const userDetails = document.getElementById("detail");
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("id");
  if (!userId) {
    alert("No user Found");
    return;
  }
  fetch(`https://671cf16209103098807bb538.mockapi.io/Users/${userId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((user) => {
      const firstLetter = user.FirsName ? user.FirsName[0] : "?";

      userDetails.innerHTML = `
      <div class="detail-circle">
        <img src="${user.Avatar}" width="max-content" onerror="this.style.display='none'; this.parentElement.innerHTML = '<p>${firstLetter}</p>'" />
      </div>
        <h2 id="name">${user.FirsName} ${user.LastName}</h2>
        <div class="info">
          <div class="col">
            <div class="box" id="firstName">${user.FirsName}</div>
            <div class="box" id="number">${user.Number}</div>
            </div>
            <div class="col">
            <div class="box" id="lastName">${user.LastName}</div>
            <div class="box" id="country">${user.Country}</div>
          </div>
        </div>`;
    })
    .catch((error) => {
      console.error("Error fetching user details:", error);
    });
});
