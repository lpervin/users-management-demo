import {  emptyProps, createActionGroup, props, createAction } from "@ngrx/store";
import { UserRequiredProps } from "../../models/UsersModel";


export const UserListPagingActions = createActionGroup({
        source: 'UserList Paging',
        events: {
            'Init': emptyProps(),
            'GotoPage': props<{page: number}>(),
            'NextPage': emptyProps(),
            'PreviousPage': emptyProps(),
            'NextPageRange':emptyProps(),
            'PrevPageRange':emptyProps()
         }
});

export const SelectUserForEdit = createAction('[User-edit page] SelectUser', props<{userId:string}>());
export const updateUser = createAction(
    "[User-edit page] Update User",
    props<{ userId: string; changes: UserRequiredProps }>()
  );