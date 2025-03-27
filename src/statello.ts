export type Subscriber<T> = (value: T) => void;
export type UpdaterCallback<T> = (value: T) => T;

export function useState<T>(initialValue: T): [() => T, (valueOrFn: T | UpdaterCallback<T>, opt?: {equalityCheck: boolean}) => void, (callback: Subscriber<T>) => () => void] {
  let state = initialValue;
  const subscribers: Subscriber<T>[] = [];

  function get(): T {
    return state;
  }

  function set(valueOrFn: T | UpdaterCallback<T>, opt?: {equalityCheck: boolean}): void {
    const newValue = typeof valueOrFn === 'function'
      ? (valueOrFn as UpdaterCallback<T>)(state)
      : valueOrFn;

      if (!opt?.equalityCheck || state !== newValue) {
        state = newValue
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
