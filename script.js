"use strict";

const entirePage = document.querySelector("body");

const quoteHeart = document.getElementById("quote-heart");
const quoteText = document.getElementById("quote-text");
const quoteTextHeart = document.querySelector(".quote-text-heart");
const quoteThumbs = document.getElementById("thumbs-down");
const hello = document.getElementById("hello");
const flower = document.getElementById("flower");

const sun = document.getElementById("sun");
const sunYellow = document.getElementById("sun-yellow");
const cloudsBlue = document.getElementById("clouds-blue");
const stormPurple = document.getElementById("storm-purple");

const pinkSwitch = document.getElementById("switch");

pinkSwitch.classList.add("hidden");

//Initial Fetch Quote

entirePage.classList.add("hidden");

flower.addEventListener("click", () => {
  const userName = prompt("Please enter your name");
  localStorage.setItem("userName", JSON.stringify(userName));
  hello.textContent = `Hello, ${userName}.`;
});

window.addEventListener("DOMContentLoaded", () => {
  const savedName = JSON.parse(localStorage.getItem("userName"));

  if (savedName) {
    hello.textContent = `Hello, ${savedName}.`;
    flower.classList.remove("fast-heartbeat");
  }
});

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
    document.getElementById("quote-text").textContent =
      "A dead end is just a good place to turn around. – Naomi Judd ";
  }
}

fetchQuote();

quoteHeart.addEventListener("click", () => {
  console.log("click");
  quoteText.style.color = "#ff95dc";
  quoteText.style.fontSize = "18px";
  quoteText.style.fontWeight = "bold";
});

// Event handler for quote interactions
quoteThumbs.addEventListener("click", () => {
  if ((quoteText.style.color = "#ff95dc")) {
    quoteText.style.color = "#656565";
    quoteText.style.fontWeight = "normal";
  }
  console.log("click");
  fetchQuote();
});

sunYellow.classList.add("hidden");
cloudsBlue.classList.add("hidden");
stormPurple.classList.add("hidden");

// Event handler for Add Reminder and Add To Do button
const addButton = document.getElementById("add-button-reminders");
const addToDo = document.getElementById("add-button-to-do");

/*
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

*/

/* let toDo = [];
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

*/

const weatherText = document.getElementById("weather-text");

const weather = function () {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      fetch(
        `https://api.weatherapi.com/v1/current.json?key=76041a684df6449a8a4213823251606&q=${lat},${lon}`
      )
        .then((response) => response.json())
        .then((data) => {
          const condition = data.current.condition.text;
          const codeCondition = data.current.condition.code;
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

          // Hide all first
          sunYellow.classList.add("hidden");
          cloudsBlue.classList.add("hidden");
          stormPurple.classList.add("hidden");

          // Show based on condition code
          if (codeCondition <= 1003) {
            sunYellow.classList.remove("hidden");
            sunYellow.classList.add("heartbeat");
          } else if (codeCondition <= 1069) {
            cloudsBlue.classList.remove("hidden");
            cloudsBlue.classList.add("heartbeat");
          } else {
            stormPurple.classList.remove("hidden");
            stormPurple.classList.add("heartbeat");
          }
        })
        .catch((error) => {
          console.error("Error fetching weather:", error);
        });
    },
    function (error) {
      console.error("Geolocation error:", error);
    }
  );
};

weather();

// new reminder function:

let reminders = [];

const userRemindersContainer = document.querySelector("#user-input-reminders");

const savedReminders = JSON.parse(localStorage.getItem("reminders")) || [];

reminders = savedReminders;

reminders.forEach((reminderObj) => {
  createReminder(reminderObj);
});

/* reminderObj is used before it is explicitly defined because 

For each item in the array, you define reminderObj as a local variable in the loop

Then you pass that reminderObj into createReminder()

So in this case, reminderObj is defined right there as part of the loop — not before. */

function createReminder(reminderObj) {
  const { text, done } = reminderObj;
  const reminderDiv = document.createElement("div");
  reminderDiv.style.display = "flex";
  reminderDiv.style.flexDirection = "row";
  reminderDiv.style.alignItems = "center";
  reminderDiv.style.marginBottom = "-40px";
  reminderDiv.style.marginTop = "-15px";
  reminderDiv.classList.add("reminder");

  const completeButton = document.createElement("button");
  completeButton.style.all = "unset";
  completeButton.innerHTML = `<svg
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

  const textDiv = document.createElement("div");
  textDiv.classList.add("user-input-reminders");
  textDiv.textContent = text;
  textDiv.style.cursor = "pointer";

  textDiv.addEventListener("click", () => {
    textDiv.classList.toggle("user-reminders-green");
    const index = reminders.findIndex((r) => r.text === text);
    reminderObj.done = textDiv.classList.contains("user-reminders-green");
    if (index !== -1) {
      reminders[index].done = reminderObj.done;
      localStorage.setItem("reminders", JSON.stringify(reminders));
    }
  });

  if (done) {
    textDiv.classList.add("user-reminders-green");
  }

  reminderDiv.appendChild(completeButton); // Add the button inside the reminder container
  reminderDiv.appendChild(textDiv); // Add the text
  userRemindersContainer.appendChild(reminderDiv); // Add the whole thing to the page

  completeButton.addEventListener("click", () => {
    reminderDiv.remove();
    const index = reminders.findIndex((r) => r.text === reminderObj.text);
    reminders.splice(index, 1);

    /* index = the position of the reminder. 
    reminders.findIndex(r) searches the reminders list and finds where r.text = the object we created earlier. 
    then, reminders.splice removes the object at index's position from the reminder array by 1 element, effectively removing the object at index's position, and the reminder that was clicked on in the ui.
    */

    localStorage.setItem("reminders", JSON.stringify(reminders));

    // resave everything.
  });
}

addButton.addEventListener("click", () => {
  if (reminders.length >= 6) {
    alert("You can only have up to 6 reminders.");
    return;
  }

  const userInput = prompt("Type your reminder:");

  if (!userInput) return;

  const reminderObj = { text: userInput.trim(), done: false };
  reminders.push(reminderObj);

  localStorage.setItem("reminders", JSON.stringify(reminders));

  createReminder(reminderObj);

  console.log("Creating reminder:", reminderObj);
});

let toDo = [];

const toDoContainer = document.querySelector("#to-do-box");

const savedToDo = JSON.parse(localStorage.getItem("toDo")) || [];

toDo = savedToDo;

toDo.forEach((toDoObj) => {
  createToDo(toDoObj);
});

function createToDo(toDoObj) {
  const { text, done } = toDoObj;
  const toDoDiv = document.createElement("div");

  toDoDiv.style.display = "flex";
  toDoDiv.style.flexDirection = "row";
  toDoDiv.style.alignItems = "center";
  toDoDiv.classList.add("toDo");
  toDoDiv.style.marginBottom = "-22px";
  toDoDiv.style.marginTop = "-15px";

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

  const textDiv = document.createElement("div");
  textDiv.classList.add(".user-to-do");
  textDiv.textContent = text;
  textDiv.style.cursor = "pointer";
  textDiv.style.color = "#787878";
  textDiv.style.fontWeight = "normal";

  textDiv.addEventListener("click", () => {
    textDiv.style.color = " #3fd239";

    const index = toDo.findIndex((r) => r.text === text);
    toDoObj.done = textDiv.style.color = " #3fd239";
    if (index !== -1) {
      toDo[index].done = toDoObj.done;
      localStorage.setItem("toDo", JSON.stringify(toDo));
    }
  });

  if (done) {
    textDiv.style.color = " #3fd239";
  }

  toDoDiv.appendChild(completeButton);
  toDoDiv.appendChild(textDiv);

  toDoContainer.appendChild(toDoDiv);

  completeButton.addEventListener("click", () => {
    toDoDiv.remove();
    const index = toDo.findIndex((i) => i.text === toDoObj.text);
    toDo.splice(index, 1);

    localStorage.setItem("toDo", JSON.stringify(toDo));
  });
}

addToDo.addEventListener("click", () => {
  if (toDo.length >= 9) {
    alert("You can only have up to 9 reminders.");
    return;
  }

  const userToDo = prompt("Type your To Do");

  if (!userToDo) return;

  const toDoObj = { text: userToDo.trim(), done: false };

  toDo.push(toDoObj);

  localStorage.setItem("toDo", JSON.stringify(toDo));

  createToDo(toDoObj);
});

const done = new Audio("doneSound.mp3"); // File name as a string

completeButton.addEventListener("click", () => {
  done.play(); // This only runs when clicked
});
