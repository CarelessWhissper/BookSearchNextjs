"use client";

import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { makeStore } from "./store";
import { useRef } from 'react';

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  const { store, persistor } = useRef(makeStore()).current;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}