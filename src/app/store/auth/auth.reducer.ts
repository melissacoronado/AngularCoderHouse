import { createReducer, on } from "@ngrx/store"
import { IUser } from "../../dashboard/pages/users/models/user"
import { AuthActions } from "./auth.actions"

export const authFeatureKey = 'auth';

export interface IState {
    authUser: IUser | null
}

const initialState: IState = {
    authUser: null,
}

export const authReducer = createReducer(initialState, 
    on(AuthActions.setAuthUser, (state, {data}) => ({ ...state, authUser: data})),

    on(AuthActions.resetState, () => initialState)
)