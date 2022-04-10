import { Action, createReducer, on } from "@ngrx/store";
import { NavigationSet, NavigationUnset } from "./navigation.action";
import { NavigationEntity } from "./navigation.model";

const initialState: NavigationEntity = {
  hide: false,
};

const _NavigationReducer = createReducer(
  initialState,
  on(NavigationSet, (_, { payload }) => payload),
  on(NavigationUnset, (_) => initialState)
);

export function NavigationReducer(state: NavigationEntity, action: Action) {
  return _NavigationReducer(state, action)
};