import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { UserModel, UsersApiResponseModel } from "../../models/UsersModel";

export const UsersApiActions = createActionGroup({
    source: 'Users APIs',
    events: {
        'dataInit': props<{response: UsersApiResponseModel}>(),
        'pagedDataLoaded': props<{response: UsersApiResponseModel}>(),
        'apiFailure': props<{error: any}>(),
        'userUpdated': props<{user: UserModel}>()
    }
});