import { createFeatureSelector } from "@ngrx/store";
import { NavigationEntity } from "./navigation.model";

export const NavigationKey = 'navigation';

export const NavigationSelector = createFeatureSelector<NavigationEntity>(NavigationKey);
