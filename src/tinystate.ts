type Subscriber<T> = (value: T) => void;

export function useState<T>(initialValue: T): [() => T, (newValue: T) => void, (callback: Subscriber<T>) => () => void] {
  let state = initialValue;
  const subscribers: Subscriber<T>[] = [];

  function get(): T {
    return state;
  }

  function set(newValue: T): void {
    if (newValue !== state) {
      state = newValue;
      subscribers.forEach((callback) => callback(state));
    }
  }

  function subscribe(callback: Subscriber<T>): () => void {
    subscribers.push(callback);
    return () => {
      const index = subscribers.indexOf(callback);
      if (index !== -1) {
        subscribers.splice(index, 1);
      }
    };
  }

  return [get, set, subscribe];
}
