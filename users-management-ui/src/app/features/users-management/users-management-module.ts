import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { StoreModule } from '@ngrx/store';
import { usersListReducer } from './state/user-list.reducer';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { UsersApiEffects } from './state/users-api-effects';
import { PagerComponent } from 'src/app/shared/components/pager/pager.component';
import { MaterialModule } from 'src/app/material.module';
import { UserEditComponent } from './components/user-edit/user-edit-page/user-edit.component';
import { UserEditFormComponent } from './components/user-edit/user-edit-form/user-edit-form.component';
import { ReactiveFormsModule } from "@angular/forms";

const usersRoutes: Routes = [
  {   path: 'users',  component: UsersListComponent },
  {   path: 'users/:id', component: UserEditComponent }
];

@NgModule({  
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(usersRoutes),
    StoreModule.forFeature('users', usersListReducer),
    EffectsModule.forFeature([UsersApiEffects]),
    FormsModule,
    MaterialModule
  ],
  declarations: [UsersListComponent,
    UserEditComponent,
    UserEditFormComponent,
    PagerComponent
  ],
})
export class UsersManagementModule { }
