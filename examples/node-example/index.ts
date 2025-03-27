// Node.js Examples for statello

import { useState } from "statello";

console.log("--- Example 1: Basic Counter ---");
const [count, setCount, subscribe] = useState(0);

subscribe((newValue) => {
  console.log("Counter updated:", newValue);
});

setCount(1); // Console: Counter updated: 1
setCount(2); // Console: Counter updated: 2

console.log("Current count:", count()); // Current count: 2

console.log("\n--- Example 2: Managing a Configuration Object ---");
const [config, setConfig, subscribeConfig] = useState({ theme: "light", debug: false });

subscribeConfig((newConfig) => {
  console.log("Config updated:", newConfig);
});

setConfig({ ...config(), theme: "dark" }); // Console: Config updated: { theme: 'dark', debug: false }
setConfig({ ...config(), debug: true }); // Console: Config updated: { theme: 'dark', debug: true }

console.log("\n--- Example 3: Simulating Asynchronous Updates ---");
const [, setStatus, subscribeStatus] = useState("idle");

subscribeStatus((newStatus) => {
  console.log("Status changed to:", newStatus);
});

setTimeout(() => setStatus("loading"), 1000);
setTimeout(() => setStatus("success"), 2000);

console.log("\n--- Example 4: Handling a List of Items ---");
const [items, setItems, subscribeItems] = useState<string[]>([]);

subscribeItems((newItems) => {
  console.log("Updated items:", newItems);
});

setItems(["Item 1"]);
setItems((items) => [...items, "Item 2"]);
setItems([...items(), "Item 3"]);

console.log("\n--- Example 5: Unsubscribing from Changes ---");
const [, setName, subscribeName] = useState("Alice");
const unsubscribe = subscribeName((newName) => {
  console.log("Name updated to:", newName);
});

setName("Bob"); // Console: Name updated to: Bob
unsubscribe();
setName("Charlie"); // No log output, as we unsubscribed
