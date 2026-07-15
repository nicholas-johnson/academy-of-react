import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "./reduxStore.ts";

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
