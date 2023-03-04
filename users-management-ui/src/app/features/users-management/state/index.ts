
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromUserList from "./user-list.reducer";

export interface State {  
  users: fromUserList.UserListState;
}

export const selectUserListState = (state: State) => state.users;

export const selectUsersPageData = createSelector(selectUserListState,   
    fromUserList.selectAll
);

export const selectStateEntities = createSelector(selectUserListState, 
  fromUserList.selectEntities
  );


export const selectedUserData = createSelector(
        selectUserListState,
        selectStateEntities,
        (state, entities) =>  {         
          return state.selectedUserId ? entities[state.selectedUserId] : null;
        }
      );

export const selectLoadingStatus = createSelector(selectUserListState,
                        state => state.DataStatus
                  );

export const selectPaging = createSelector(selectUserListState,
            state => state.Paging
            );

  export const selectErrorMessage = createSelector(selectUserListState, 
                                  state => state.ErrorMessage
                       );