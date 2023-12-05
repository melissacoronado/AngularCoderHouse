import { ActionReducerMap } from "@ngrx/store";
import { IState, authFeatureKey, authReducer } from "./auth/auth.reducer";
 
export interface AppState{
    [authFeatureKey]: IState;
}

export const appReducer: ActionReducerMap<any> = {
    [authFeatureKey]: authReducer
}