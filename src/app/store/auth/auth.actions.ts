import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { IUser } from "../../dashboard/pages/users/models/user";

export const AuthActions = createActionGroup({
    source: 'Auth',
    events: {
        'Set Auth User': props<{data: IUser}>(),
        'Reset State': emptyProps(),
    }
})