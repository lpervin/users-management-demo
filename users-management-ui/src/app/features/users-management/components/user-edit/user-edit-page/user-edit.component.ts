import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {  State, selectedUserData, selectLoadingStatus  } from '../../../state';

import { UserModel } from '../../../models/UsersModel';
import { SelectUserForEdit, updateUser } from '../../../state/actions/users-list-page.actions';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
 // pagerViewModel$!: Observable<PagerViewModel>;
 loadingStatu$!: Observable<string>;
  currentSelectedUserData$!: Observable<UserModel | null | undefined>;



  constructor(private route:ActivatedRoute, private router: Router, private store: Store<State>) { }
   userId!: string;
  ngOnInit(): void {
      const userId = this.route.snapshot.params["id"];
      this.store.dispatch(SelectUserForEdit({userId}))
      this.currentSelectedUserData$ = this.store.select(selectedUserData);
      this.loadingStatu$ = this.store.select(selectLoadingStatus);
   //   this.pagerViewModel$ = this.store.select(selectPaging);
  }
 

  onCancel(){
     this.router.navigate(['/users']);  

  }

  onSave(userData: UserModel){
   // console.log(userData);
   this.store.dispatch(updateUser({userId: userData.id, changes: userData}));
   this.router.navigate(['/users']);    
  }
}
