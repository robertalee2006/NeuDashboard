"use strict";

async function fetchQuote() {
  const timestamp = Date.now();
  const targetUrl = `http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en&_=${timestamp}`;
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
    targetUrl
  )}`;

  try {
    const response = await fetch(proxyUrl);
    const dataWrapped = await response.json();
    const data = JSON.parse(dataWrapped.contents);

    console.log("Fetched quote:", data.quoteText);

    document.getElementById("quote-text").textContent = `${data.quoteText} — ${
      data.quoteAuthor || "Unknown"
    }`;
  } catch (error) {
    console.error("Failed to fetch quote:", error);
    document.getElementById("quote-text").textContent = "Failed to load quote.";
  }
}

// Initial fetch
fetchQuote();

// document.addEventListener("DOMContentLoaded", function () {
//   var calendarEl = document.getElementById("calendar");
//   var calendar = new FullCalendar.Calendar(calendarEl, {
//     initialView: "dayGridMonth",
//     selectable: true,
//     headerToolbar: {
//       left: "prev,next today",
//       center: "title",
//       right: "dayGridMonth,timeGridWeek,timeGridDay",
//     },
//     dateClick: function (info) {
//       alert("Clicked on: " + info.dateStr);
//       // You can add your own code here to handle date clicks (e.g., add a to-do)
//     },
//   });
//   calendar.render();
// });

document.getElementById("thumbs-down").addEventListener("click", () => {
  fetchQuote();
});

fetchQuote();

// Call it once when page loads

const quoteHeart = document.getElementById("quote-heart");
const quoteThumbs = document.getElementById("thumbs-down");

quoteThumbs.addEventListener("click", () => {
  console.log("click");
  fetchQuote();
});

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

const addToDo = document.getElementById("add-button-to-do");

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

let toDo = [];

addToDo.addEventListener("click", () => {
  if (toDo.length >= 9) {
    alert("You can only have up to 6 to-dos.");
    return;
  }

  const userInput = prompt("Type your To Do:");
  if (userInput && userInput.trim() !== "") {
    // Create a new div for this reminder
    const div = document.createElement("div");
    div.textContent = userInput;
    div.style.padding = "8px";
    div.style.borderBottom = "1px solid #ddd";

    // Append it to the list
    document.querySelector(".user-to-do").appendChild(div);

    // Push to the array
    reminders.push(userInput.trim());
  }
});
