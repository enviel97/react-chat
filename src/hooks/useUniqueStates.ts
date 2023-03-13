import { useState } from "react";

const useUniqueState = <T>(initial?: T[]) => {
  const [set, setSet] = useState(new Set<T>(initial));
  return {
    add: (el: T) =>
      setSet((set) => {
        if (set.has(el)) return set;
        set.add(el);
        return new Set(set);
      }),
    delete: (el: T) => {
      setSet((set) => {
        if (!set.has(el)) return set;
        set.delete(el);
        return new Set(set);
      });
    },
    has: (el: T) => set.has(el),
    clear: () => setSet(new Set()),
    [Symbol.iterator]: () => set.values(),
    forEach: (fn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any) =>
      set.forEach(fn, thisArg),
    keys: () => set.keys(),
    values: () => set.values(),
    get size() {
      return set.size;
    },
  };
};

export default useUniqueState;
