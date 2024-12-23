import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import bookReducer from "@/lib/createBookSlice"; 

const rootReducer = combineReducers({
  books: bookReducer,  
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
