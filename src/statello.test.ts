import { useState } from "./statello";

describe("statello", () => {
  test("should initialize state with the given initial value", () => {
    const [count] = useState(10);
    expect(count()).toBe(10);
  });

  test("should update state when set is called", () => {
    const [count, setCount] = useState(0);
    setCount(5);
    expect(count()).toBe(5);
  });

  test("should not update state if the same value is set", () => {
    const [count, setCount, subscribe] = useState(0);
    const callback = jest.fn();
    subscribe(callback);
    setCount(0);
    expect(callback).not.toHaveBeenCalled();
  });

  test("should notify subscribers on state change", () => {
    const [count, setCount, subscribe] = useState(0);
    const callback = jest.fn();
    subscribe(callback);
    setCount(2);
    expect(callback).toHaveBeenCalledWith(2);
  });

  test("should allow multiple subscribers", () => {
    const [count, setCount, subscribe] = useState(0);
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    subscribe(callback1);
    subscribe(callback2);
    setCount(3);

    expect(callback1).toHaveBeenCalledWith(3);
    expect(callback2).toHaveBeenCalledWith(3);
  });

  test("should unsubscribe correctly", () => {
    const [count, setCount, subscribe] = useState(0);
    const callback = jest.fn();
    const unsubscribe = subscribe(callback);

    unsubscribe();
    setCount(4);
    expect(callback).not.toHaveBeenCalled();
  });

  test("should not call removed subscribers on state change", () => {
    const [count, setCount, subscribe] = useState(0);
    const callback = jest.fn();
    const unsubscribe = subscribe(callback);

    unsubscribe();
    setCount(5);
    expect(callback).not.toHaveBeenCalled();
  });

  test("should allow re-subscribing after unsubscribe", () => {
    const [count, setCount, subscribe] = useState(0);
    const callback = jest.fn();
    let unsubscribe = subscribe(callback);
    unsubscribe();

    unsubscribe = subscribe(callback);
    setCount(6);
    expect(callback).toHaveBeenCalledWith(6);
  });

  test("should work with different data types", () => {
    const [stringState, setStringState] = useState("hello");
    setStringState("world");
    expect(stringState()).toBe("world");

    const [booleanState, setBooleanState] = useState(true);
    setBooleanState(false);
    expect(booleanState()).toBe(false);

    const [arrayState, setArrayState] = useState([1, 2, 3]);
    setArrayState([4, 5, 6]);
    expect(arrayState()).toEqual([4, 5, 6]);
  });

  test("should not mutate the previous state when setting a new value", () => {
    const [objState, setObjState] = useState({ a: 1 });
    const prevState = objState();
    setObjState({ a: 2 });
    expect(objState()).not.toBe(prevState);
    expect(objState()).toEqual({ a: 2 });
  });

  test("should allow subscribing before any state change", () => {
    const [count, setCount, subscribe] = useState(0);
    const callback = jest.fn();
    subscribe(callback);
    setCount(7);
    expect(callback).toHaveBeenCalledWith(7);
  });
});
