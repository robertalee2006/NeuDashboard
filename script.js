"use strict";

const entirePage = document.querySelector("body");

const quoteHeart = document.getElementById("quote-heart");
const quoteThumbs = document.getElementById("thumbs-down");
const hello = document.getElementById("hello");

const sun = document.getElementById("sun");
const sunYellow = document.getElementById("sun-yellow");
const cloudsBlue = document.getElementById("clouds-blue");
const stormPurple = document.getElementById("storm-purple");

//Initial Fetch Quote

entirePage.classList.add("hidden");

function helloFunction() {
  const userName = prompt("Please enter your name");
  hello.textContent = `Hello, ${userName}.`;
}

helloFunction();

entirePage.classList.remove("hidden");
entirePage.classList.add("fade-in");

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

// Event handler for quote interactions
quoteThumbs.addEventListener("click", () => {
  console.log("click");
  fetchQuote();
});

quoteHeart.addEventListener("click", () => {
  //
});

sunYellow.classList.add("hidden");
cloudsBlue.classList.add("hidden");
stormPurple.classList.add("hidden");

// Event handler for Add Reminder and Add To Do button
const addButton = document.getElementById("add-button-reminders");
const addToDo = document.getElementById("add-button-to-do");

let reminders = [];

addButton.addEventListener("click", () => {
  if (reminders.length >= 6) {
    alert("You can only have up to 6 reminders.");
    return;
  }

  const userInput = prompt("Type your reminder:");

  if (!userInput) return;

  // Create outer reminder container
  const reminderDiv = document.createElement("div");
  reminderDiv.style.display = "flex";
  reminderDiv.style.flexDirection = "row";
  reminderDiv.style.alignItems = "center";
  reminderDiv.style.marginBottom = "-40px";
  reminderDiv.style.marginTop = "-15px";

  reminderDiv.classList.add("reminder");

  // Create checkbox button with SVG
  const completeButton = document.createElement("button");
  completeButton.style.all = "unset";
  completeButton.innerHTML = `              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="70"
                height="70"
                viewBox="0 0 70 70"
                fill="none"
              >
                <g filter="url(#filter0_dd_30_148)">
                  <circle cx="35" cy="35" r="15" fill="#F0F0F3" />
                </g>
                <defs>
                  <filter
                    id="filter0_dd_30_148"
                    x="0"
                    y="0"
                    width="70"
                    height="70"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dx="10" dy="10" />
                    <feGaussianBlur stdDeviation="5" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_30_148"
                    />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dx="-10" dy="-10" />
                    <feGaussianBlur stdDeviation="5" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="effect1_dropShadow_30_148"
                      result="effect2_dropShadow_30_148"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect2_dropShadow_30_148"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>`;

  completeButton.style.borderRadius = "100%";
  completeButton.style.background = "none";
  completeButton.style.margin = "0";
  completeButton.style.padding = "0";
  completeButton.style.transform = "scale(0.7)";
  completeButton.style.cursor = "pointer";

  // Add click event to complete button to remove reminder

  completeButton.addEventListener("click", () => {
    reminderDiv.remove();
    const index = reminders.indexOf(userInput.trim());
    if (index > -1) {
      reminders.splice(index, 1);
    }
  });

  // Reminder text
  const textDiv = document.createElement("div");
  textDiv.classList.add("user-input-reminders");
  textDiv.textContent = userInput.trim();

  // Add elements to reminderDiv
  reminderDiv.appendChild(completeButton);
  reminderDiv.appendChild(textDiv);

  // Append to user-input-reminders container
  const userRemindersContainer = document.querySelector(
    "#user-input-reminders"
  );

  textDiv.style.cursor = "pointer";

  textDiv.addEventListener("click", () => {
    textDiv.classList.toggle("user-reminders-green");
  });

  userRemindersContainer.appendChild(reminderDiv);

  reminders.push(userInput.trim());
});

let toDo = [];
addToDo.addEventListener("click", () => {
  if (toDo.length >= 9) {
    alert("You can only have up to 9 to-dos.");
    return;
  }

  const userToDo = prompt("Type your to-dos:");
  if (!userToDo || userToDo.trim() === "") return;

  const toDoDiv = document.createElement("div");
  toDoDiv.style.display = "flex";
  toDoDiv.style.flexDirection = "row";
  toDoDiv.style.alignItems = "center";
  toDoDiv.style.marginBottom = "-40px";
  toDoDiv.style.marginTop = "-15px";
  toDoDiv.classList.add("toDo");

  // Create the complete button
  const completeButton = document.createElement("button");
  completeButton.style.all = "unset";
  completeButton.style.borderRadius = "100%";
  completeButton.style.background = "none";
  completeButton.style.margin = "0";
  completeButton.style.padding = "0";
  completeButton.style.transform = "scale(0.7)";
  completeButton.style.cursor = "pointer";

  completeButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
      <g filter="url(#filter0_dd_30_148)">
        <circle cx="35" cy="35" r="15" fill="#F0F0F3" />
      </g>
      <defs>
        <filter id="filter0_dd_30_148" x="0" y="0" width="70" height="70" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="10" dy="10" />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_30_148" />
          <feColorMatrix in="SourceAlpha" type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="-10" dy="-10" />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0" />
          <feBlend mode="normal" in2="effect1_dropShadow_30_148" result="effect2_dropShadow_30_148" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_30_148" result="shape" />
        </filter>
      </defs>
    </svg>
  `;

  completeButton.addEventListener("click", () => {
    toDoDiv.remove();
    const index = toDo.indexOf(userToDo.trim());
    if (index > -1) {
      toDo.splice(index, 1);
    }
  });

  const textDiv = document.createElement("div");
  textDiv.classList.add("to-do-text");
  textDiv.textContent = userToDo.trim();
  textDiv.style.cursor = "pointer";

  textDiv.addEventListener("click", () => {
    textDiv.classList.toggle("user-reminders-green");
  });

  toDoDiv.appendChild(completeButton);
  toDoDiv.appendChild(textDiv);

  const userToDoContainer = document.querySelector(".user-to-do");
  userToDoContainer.appendChild(toDoDiv);

  toDo.push(userToDo.trim());
});

const weatherText = document.getElementById("weather-text");

const weather = function () {
  fetch(
    "https://api.weatherapi.com/v1/current.json?key=76041a684df6449a8a4213823251606&q=Vancouver"
  )
    .then((response) => response.json())
    .then((data) => {
      // const condition = data.current.condition.text; // e.g. "Clear", "Overcast", "Rain"
      const condition = data.current; // e.g. "Clear", "Overcast", "Rain"
      const codeCondition = data.current.condition.code; // 1003, etc...
      const feelsLike = data.current.feelslike_c;

      console.log(condition);

      const today = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const formatted = today.toLocaleDateString("en-US", options);

      weatherText.textContent = `Today is ${formatted}, and it feels like ${feelsLike} degrees outside.`;

      if (codeCondition <= 1003) {
        sunYellow.classList.remove("hidden");
        sun.classList.add("hidden");
        sunYellow.classList.add("heartbeat");
      } else if (codeCondition <= 1069) {
        cloudsBlue.classList.remove("hidden");
        cloudsBlue.classList.add("heartbeat");
      } else if (codeCondition >= 1069) {
        stormPurple.classList.remove("hidden");
        stormPurple.classList.add("heartbeat");
      }
    })
    .catch((error) => {
      console.error("Error fetching weather:", error);
    });
};

weather();
