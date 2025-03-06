# statello

A lightweight, framework-agnostic state management library for TypeScript and JavaScript.

## 🚀 Features

- Minimal and fast ⚡
- Works with any framework or vanilla JavaScript
- Simple API similar to React's `useState`
- Supports subscriptions for reactive updates

## 📦 Installation

```sh
npm install statello
```

or

```sh
yarn add statello
```

## 🔥 Usage

### Basic Example

```typescript
import { useState } from "statello";

// Create a state variable
const [count, setCount, subscribe] = useState(0);

console.log(count()); // 0

// Subscribe to changes
const unsubscribe = subscribe((newValue) => {
  console.log("New value:", newValue);
});

// Update state
setCount(5); // Console: "New value: 5"

// Unsubscribe when no longer needed
unsubscribe();
```

### Using statello in a UI Framework

You can integrate `statello` easily into any framework like Vue, Angular, Svelte, or even plain HTML.

#### Example with Vanilla JavaScript:

```html
<button id="increment">Increment</button>
<p id="count"></p>

<script type="module">
  import { useState } from "statello";

  const [count, setCount, subscribe] = useState(0);
  const countDisplay = document.getElementById("count");
  const button = document.getElementById("increment");

  // Update UI on state change
  subscribe((newValue) => {
    countDisplay.textContent = `Count: ${newValue}`;
  });

  // Handle button click
  button.addEventListener("click", () => {
    setCount(count() + 1);
  });
</script>
```

## 🛠 API

### `useState<T>(initialValue: T): [() => T, (newValue: T) => void, (callback: Subscriber<T>) => () => void]`

Creates a reactive state variable.

#### Parameters:

- `initialValue: T` – The initial state value.

#### Returns:

- `get: () => T` – A function to retrieve the current state.
- `set: (newValue: T) => void` – A function to update the state.
- `subscribe: (callback: (value: T) => void) => () => void` – A function to listen for state changes, returning an unsubscribe function.

## 📜 License

MIT License © 2025 [Thomas TOLEDO](https://github.com/thomastoledo)

## 🌍 Contribute

We welcome contributions! Feel free to open issues or submit PRs.

- [GitHub Repository](https://github.com/yourgithub/statello)
- [NPM Package](https://www.npmjs.com/package/statello)
