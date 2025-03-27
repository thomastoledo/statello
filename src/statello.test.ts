import { useState } from "./statello";

describe("Statello", () => {
  test("should initialize state with the given initial value", () => {
    const [count] = useState(10);
    expect(count()).toBe(10);
  });

  test("should update state with a direct value", () => {
    const [count, setCount] = useState(0);
    setCount(5);
    expect(count()).toBe(5);
  });

  test("should update state using an updater function", () => {
    const [count, setCount] = useState(1);
    setCount((prev) => prev + 2);
    expect(count()).toBe(3);
  });

  test("should notify subscribers on direct state change", () => {
    const [count, setCount, subscribe] = useState(0);
    const callback = jest.fn();
    subscribe(callback);
    setCount(42);
    expect(callback).toHaveBeenCalledWith(42);
  });

  test("should notify subscribers on updater function", () => {
    const [count, setCount, subscribe] = useState(10);
    const callback = jest.fn();
    subscribe(callback);
    setCount((prev) => prev * 2);
    expect(callback).toHaveBeenCalledWith(20);
  });

  test("should allow multiple subscribers", () => {
    const [count, setCount, subscribe] = useState(0);
    const cb1 = jest.fn();
    const cb2 = jest.fn();
    subscribe(cb1);
    subscribe(cb2);
    setCount(100);
    expect(cb1).toHaveBeenCalledWith(100);
    expect(cb2).toHaveBeenCalledWith(100);
  });

  test("should unsubscribe a subscriber", () => {
    const [count, setCount, subscribe] = useState(0);
    const callback = jest.fn();
    const unsubscribe = subscribe(callback);
    unsubscribe();
    setCount(999);
    expect(callback).not.toHaveBeenCalled();
  });

  test("should work with string state", () => {
    const [text, setText] = useState("hello");
    setText("world");
    expect(text()).toBe("world");
  });

  test("should work with object state", () => {
    const [obj, setObj] = useState({ a: 1 });
    setObj((prev) => ({ ...prev, b: 2 }));
    expect(obj()).toEqual({ a: 1, b: 2 });
  });

  test("should work with array state", () => {
    const [arr, setArr] = useState([1, 2]);
    setArr((prev) => [...prev, 3]);
    expect(arr()).toEqual([1, 2, 3]);
  });

  test("should notify on setting the same value", () => {
    const [value, setValue, subscribe] = useState(7);
    const callback = jest.fn();
    subscribe(callback);
    setValue(7);
    expect(callback).toHaveBeenCalledWith(7);
  });

  test("should notify on updating to same value via function", () => {
    const [value, setValue, subscribe] = useState(5);
    const callback = jest.fn();
    subscribe(callback);
    setValue((prev) => prev);
    expect(callback).toHaveBeenCalledWith(5);
  });
});
