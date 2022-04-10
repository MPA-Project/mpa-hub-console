import { createAction, props } from "@ngrx/store";
import { NavigationEntity } from "./navigation.model";

export enum NavigationActionTypes {
  Set = '[Navigation] Set',
  Unset = '[Navigation] Unset',
};

export const NavigationSet = createAction(NavigationActionTypes.Set, props<{ payload: NavigationEntity }>());

export const NavigationUnset = createAction(NavigationActionTypes.Unset);