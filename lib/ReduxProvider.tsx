"use client";

import { Provider } from "react-redux";
import { makeStore } from "./store";

const store = makeStore();

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}


/*  
Provider from react-redux is not compatible with React Server Components. In React 18+ with Next.js 13+ (using the App Router),
 Redux must be used on the client side, as the store involves mutable state, 
 which conflicts with server rendering principles.
*/