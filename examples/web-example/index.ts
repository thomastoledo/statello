import { useState } from "statello";
import { maybe } from "pelouse";
// Example 1: Simple Counter
const [, setCount, subscribeCount] = useState(0);
const countDisplay = document.getElementById("count-display");
const countButton = document.getElementById("increment-button");

subscribeCount((newValue) => {
  maybe<HTMLElement>(countDisplay).forEach((element) => (element.textContent = `Count: ${newValue}`));
});

maybe(countButton).forEach((element) =>
  element.addEventListener("click", () => {
    setCount((count) => count + 1);
  })
);

// Example 2: Theme Switcher
const [theme, setTheme, subscribeTheme] = useState("light");
const body = document.body;
const themeButton = document.getElementById("theme-button");

subscribeTheme((newTheme) => {
  body.className = newTheme;
});

maybe(themeButton).forEach((element) => {
  element.addEventListener("click", () => {
    setTheme(theme() === "light" ? "dark" : "light");
  });
});

// Example 3: Live Text Input Sync
const [, setText, subscribeText] = useState("");
const inputField = document.getElementById("input-field");
const outputDisplay = document.getElementById("output-display");

subscribeText((newText) => {
  maybe(outputDisplay).forEach((element) => (element.textContent = newText));
});

maybe(inputField).forEach((element) =>
  element.addEventListener("input", (event) => {
    const target = event.target as HTMLInputElement;
    maybe(target.value).forEach((value) => setText(value));
  })
);
