import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormComponent } from './pages/form/form.component';
import { UserViewComponent } from './pages/user-view/user-view.component';

export const routes: Routes = [
    {path: "", pathMatch: 'full', redirectTo: 'home'},
    {path: "home", component: HomeComponent},
    {path: "dashboard", component: DashboardComponent, children: [
        {path: "", pathMatch: 'full', redirectTo: 'users'},
        {path: "users", component: UserListComponent},
        {path: "newuser", component: FormComponent},
        {path: "updateuser/:id", component: FormComponent},
        {path: "users/:id", component: UserViewComponent}
    ]},
    
    {path: '**', redirectTo: 'home'}
];
