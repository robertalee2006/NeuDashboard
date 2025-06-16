"use strict";

const quoteHeart = document.getElementById("quote-heart");
const quoteThumbs = document.getElementById("thumbs-down");
const hello = document.getElementById("hello");
//Initial Fetch Quote

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

fetchQuote();

function helloFunction() {
  const userName = prompt("Please enter your name");
  hello.textContent = `Hello, ${userName}.`;
}

helloFunction();

// Event handler for quote interactions
quoteThumbs.addEventListener("click", () => {
  console.log("click");
  fetchQuote();
});

quoteHeart.addEventListener("click", () => {
  //
});

// Event handler for Add Reminder and Add To Do button
const addButton = document.getElementById("add-button-reminders");
const addToDo = document.getElementById("add-button-to-do");

let reminders = [];

addButton.addEventListener("click", () => {
  if (reminders.length >= 6) alert("You can only have up to 6 reminders.");
  else {
    const userInput = prompt("Type your reminder:");
    if (userInput && userInput.trim() !== "") {
      // Create a new div for this reminder
      const div = document.createElement("div");
      div.textContent = userInput;
      div.style.padding = "7px";
      div.style.borderBottom = "1px solid #ddd";

      // Append it to the list
      document.querySelector(".user-reminders").appendChild(div);
      let index = reminders.length - 1;
      console.log(index);

      //Delete it
      div.addEventListener("click", () => {
        div.remove();
        reminders.splice(index, 1);

        console.log(reminders.length);
      });

      // Push to the array
      reminders.push(userInput);
    }
  }
});

let toDo = [];

addToDo.addEventListener("click", () => {
  if (toDo.length >= 10) alert("You can only have up to 10 to-dos.");
  else {
    const userToDo = prompt("Type your to-dos:");
    if (userToDo && userToDo.trim() !== "") {
      // Create a new div for this reminder
      const div = document.createElement("div");
      div.textContent = userToDo;
      div.style.padding = "6px";
      div.style.borderBottom = "1px solid #ddd";

      // Append it to the list
      document.querySelector(".user-to-do").appendChild(div);
      let index = toDo.length - 1;
      console.log(index);

      //Delete it
      div.addEventListener("click", () => {
        div.remove();
        toDo.splice(index, 1);

        console.log(reminders.length);
      });

      // Push to the array
      toDo.push(userToDo);
    }
  }
});
