"use strict";

async function fetchQuote() {
  const url = "https://api.kanye.rest/";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("quote-text").textContent = data.quote;
    })
    .catch((error) => console.error(error));
}

// Call it once when page loads
fetchQuote();

const quoteThumbsDown = document.getElementById("thumbs-down");

quoteThumbsDown.addEventListener("click", () => {
  fetchQuote();
});

const quoteHeart = document.getElementById("quote-heart");

quoteHeart.addEventListener("click", () => {
  //
});

//

// const addButton = document.getElementById("add-button-reminders");
// const reminderList = document.getElementById("reminder-list");

// addButton.addEventListener("click", () => {
//   prompt("Type your reminder.");
// });

const addButton = document.getElementById("add-button-reminders");
// Event handler for Add Reminder button

let reminders = [];

addButton.addEventListener("click", () => {
  if (reminders.length >= 6) {
    alert("You can only have up to 6 reminders.");
    return;
  }

  const userInput = prompt("Type your reminder:");
  if (userInput && userInput.trim() !== "") {
    // Create a new div for this reminder
    const div = document.createElement("div");
    div.textContent = userInput;
    div.style.padding = "8px";
    div.style.borderBottom = "1px solid #ddd";

    // Append it to the list
    document.querySelector(".user-reminders").appendChild(div);

    // Push to the array
    reminders.push(userInput.trim());
  }
});
