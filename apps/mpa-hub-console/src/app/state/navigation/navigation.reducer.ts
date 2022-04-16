import { createReducer, on } from "@ngrx/store";
import { NavigationSet, NavigationUnset } from "./navigation.action";
import { NavigationEntity } from "./navigation.model";

const initialState: NavigationEntity = {
  hide: false,
};

export const _NavigationReducer = createReducer(
  initialState,
  on(NavigationSet, (_, { payload }) => payload),
  on(NavigationUnset, (_) => initialState)
);
