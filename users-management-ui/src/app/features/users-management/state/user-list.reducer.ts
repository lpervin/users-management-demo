import { PagerViewModel } from "src/app/shared/state/models/PagerViewModel";

import { createReducer, createSelector, on } from '@ngrx/store';

import { UserListPagingActions, SelectUserForEdit, updateUser } from "./actions/users-list-page.actions";
import { UsersApiActions } from "./actions/users-api.actions";
import { UserModel } from "../models/UsersModel";
import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { selectUserListState } from ".";



export interface UserListState extends EntityState<UserModel> {
    Paging: PagerViewModel;
    DataStatus: string | 'loading' | 'success' | 'error';
    ErrorMessage: string | null;
    selectedUserId: string | null;    
}

export const adapter = createEntityAdapter<UserModel>();

//initial state
export const initialState: UserListState = adapter.getInitialState(
    {
        selectedUserId: null,
        DataStatus:  'loading' ,
        ErrorMessage: null,
        Paging: { currentPageNumber: 1, 
                    pageSize: 5,
                    sortByName: 'Id',
                    orderBy: 'asc',
                    numberOfpages: 0, 
                    VisiablePageRanges: [],
                    AvailabelPages: [],
                    NextPageRangeAvailable: false,
                    PreviousPageRangeAvailable: false,
                    PagesRangeSize: 10      
                }
         
    
    }
);

export const usersListReducer = createReducer<UserListState>(initialState,
    on(UserListPagingActions.init, (state) : UserListState => {    
            console.log(state) ;
            return {             
                ...state,
                 DataStatus: 'loading'}
    } ),
    on(UserListPagingActions.gotopage, (state, {page}) : UserListState => {
        
        if (page<=0 || page>state.Paging.numberOfpages)
            return state;
        let currentRange =calcPageRange(state.Paging.VisiablePageRanges, state.Paging.PagesRangeSize, state.Paging.numberOfpages, page);
        return {...state,
                DataStatus: 'loading', 
                Paging: {
                    ...state.Paging,                     
                    VisiablePageRanges: currentRange,
                    currentPageNumber: page,
                    PreviousPageRangeAvailable: currentRange[0]!=1,
                    NextPageRangeAvailable: currentRange[currentRange.length-1]!=state.Paging.numberOfpages
                }
        }
    } ),
    on(UserListPagingActions.nextpage, (state) : UserListState => {
        if (state.Paging.currentPageNumber===state.Paging.numberOfpages)
            return state;
        let page:number = state.Paging.currentPageNumber;
        let nextPage = ++page;
        
        let currentRange = nextPage>state.Paging.VisiablePageRanges[state.Paging.VisiablePageRanges.length-1] ? 
                    CalcNextPageRange(state.Paging.VisiablePageRanges, state.Paging.numberOfpages, state.Paging.PagesRangeSize)
                    :
                    state.Paging.VisiablePageRanges;

        return {...state,
                DataStatus: 'loading', 
                Paging: {...state.Paging, 
                    currentPageNumber: nextPage,
                    VisiablePageRanges: currentRange,
                    PreviousPageRangeAvailable: currentRange[0]!=1,
                    NextPageRangeAvailable: currentRange[currentRange.length-1]!=state.Paging.numberOfpages
                }
        }
    } ),
    on(UserListPagingActions.previouspage, (state) : UserListState => {
        if (state.Paging.currentPageNumber==1)
            return state;
            let page:number = state.Paging.currentPageNumber;
            let prevPage = --page;

            let currentRange = prevPage<state.Paging.VisiablePageRanges[0] ? 
            CalcPrevPageRange(state.Paging.VisiablePageRanges, state.Paging.PagesRangeSize)
            :
            state.Paging.VisiablePageRanges;

        return {...state,
                DataStatus: 'loading', 
                Paging: {...state.Paging, 
                    currentPageNumber: prevPage,
                    VisiablePageRanges: currentRange,
                    PreviousPageRangeAvailable: currentRange[0]!=1,
                    NextPageRangeAvailable: currentRange[currentRange.length-1]!=state.Paging.numberOfpages
                }
        }
    } ),
    on(UserListPagingActions.nextpagerange, (state) => {
        let currentRange = CalcNextPageRange(state.Paging.VisiablePageRanges, state.Paging.numberOfpages, state.Paging.PagesRangeSize);
            return {                
                ...state,
                DataStatus: 'loading',
                 Paging: {...state.Paging,
                    currentPageNumber: currentRange[0],
                    VisiablePageRanges: currentRange,
                    PreviousPageRangeAvailable: true,
                    NextPageRangeAvailable: currentRange[currentRange.length-1]!=state.Paging.numberOfpages
                }
            }
    } ),
    on(UserListPagingActions.prevpagerange, (state) => {
        let currentRange = CalcPrevPageRange(state.Paging.VisiablePageRanges, state.Paging.PagesRangeSize);
        return {
            ...state,
            DataStatus: 'loading',
             Paging: {...state.Paging,
                currentPageNumber: currentRange[currentRange.length-1],
                VisiablePageRanges: currentRange,
                PreviousPageRangeAvailable: currentRange[0]!=1,
                NextPageRangeAvailable: currentRange[currentRange.length-1]!=state.Paging.numberOfpages
            }
        }
    }),
    on(UsersApiActions.datainit, (state, {response}): UserListState => {
        let currentRange = state.Paging && state.Paging.VisiablePageRanges.length>0 ?         
                 state.Paging.VisiablePageRanges 
                        :        
                 Array.from(Array(Math.min(response.pageCount, state.Paging.PagesRangeSize)).keys()).map(i => ++i);
        
                return  adapter.setAll(response.pageData, {...state,
                                                            DataStatus: 'success',
                                                            ErrorMessage: null,
                                                            Paging: {
                                                                    ...state.Paging,                        
                                                                    currentPageNumber: response.pageNumber,
                                                                    pageSize: response.pageSize,
                                                                    numberOfpages: response.pageCount,
                                                                    AvailabelPages: Array.from(Array(response.pageCount).keys()).map(i=>i+1),
                                                                    VisiablePageRanges: currentRange,
                                                                    PreviousPageRangeAvailable: currentRange[0]!=1,
                                                                    NextPageRangeAvailable: currentRange[currentRange.length-1]!=response.pageCount
                                                            }
        });
    }),
    on(UsersApiActions.pageddataloaded, (state, {response}): UserListState => {
        return adapter.setAll(response.pageData, {...state,
                                                     DataStatus: 'success',   });
        
    }),  
    on(updateUser, (state,action) => {
        return {...state, DataStatus: 'loading'}
    }),
    on(UsersApiActions.userupdated, (state, action)=> {
           return adapter.updateOne({id: action.user.id, changes: action.user},
                        {
                            ...state,
                            selectedUserId: null
                        }
            ); 
    }), 
    on(SelectUserForEdit, (state, {userId}): UserListState => {
        return {...state, selectedUserId: userId}
    }),
    on(UsersApiActions.apifailure, (state, {error}): UserListState => {
        console.log(error);
        return {...state,
            DataStatus: 'error',
            ErrorMessage: error.message
        };
    })
    );
    //Users List selectors
    export const {selectAll, selectEntities } = adapter.getSelectors();    
    export const selectActiveUserId = (state: UserListState) => state.selectedUserId;
   // export const selectUsersPageData = createSelector(selectAll,  (users) => users);
    export const selectActiveUser = createSelector(
        selectEntities,
        selectActiveUserId,
        (usersEntities, activeUserId) => {
            return activeUserId ? usersEntities[activeUserId] : null;
        }
    );
    //

const calcPageRange = (currentRange: number[], pagesRangeSize:number, numberOfpages:number, currentPage:number):number[] => {
    let upperBound = currentRange[currentRange.length-1];
    let lowerBound = currentRange[0];

    if (currentPage>=lowerBound && currentPage<=upperBound)
        return currentRange;
     
     let rangeNum = Math.ceil(currentPage/pagesRangeSize);
     upperBound = Math.min(rangeNum * pagesRangeSize, numberOfpages);
     lowerBound = upperBound - (pagesRangeSize-1);
     let range = [];
     for (let i = lowerBound;i<=upperBound;i++)
         range.push(i);
     
     return range;

};

 const CalcNextPageRange = (currentRange: number[], numberOfpages: number, pagesRangeSize:number): number[]  => {
   
        let nextRangeStart = currentRange[currentRange.length-1]+1;
        let nextRangeEnd = Math.min(numberOfpages, nextRangeStart+pagesRangeSize-1);
        let range = [];
        for (let i = nextRangeStart;i<=nextRangeEnd;i++)
            range.push(i);

        return range;
}


const CalcPrevPageRange = (currentRange: number[], pagesRangeSize: number): number[]  => {
   
    let prevRangeStart = Math.max(1, (currentRange[0])-pagesRangeSize);
    let prevRangeEnd = (prevRangeStart+pagesRangeSize)-1;
    let range = [];
    for (let i = prevRangeStart;i<=prevRangeEnd;i++)
        range.push(i);
    return range;
}