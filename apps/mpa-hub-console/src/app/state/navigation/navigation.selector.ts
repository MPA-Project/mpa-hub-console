import { createFeatureSelector } from "@ngrx/store";
import { NavigationEntity } from "./navigation.model";

export const NavigationKey = 'navigation';

export const selectNavigationSelector = createFeatureSelector<NavigationEntity>(NavigationKey);
