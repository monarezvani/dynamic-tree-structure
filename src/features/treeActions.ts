import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

// Typed version of useSelector for accessing state with TypeScript type safety
// which avoids potential type mismatches when accessing state properties.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Typed version of useDispatch for dispatching actions with type safety
// ensuring that dispatched actions are correctly typed and compatible with the store.
export const useAppDispatch = () => useDispatch<AppDispatch>();
