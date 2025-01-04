import { createContext, useContext } from "react";

// idea from Dowon
export function createContextHook<T>(name: string) {
  const Context = createContext<T | null>(null);

  const useContextHook = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error(`${name} must be used within a ${name}Provider`);
    }
    return context;
  };

  return [Context, useContextHook] as const;
}
