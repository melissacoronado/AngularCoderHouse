import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IState, authFeatureKey } from "./auth.reducer";

export const selectAuthState = createFeatureSelector<IState>(authFeatureKey);

export const selectAuthUser = createSelector(selectAuthState, (state) => state.authUser);