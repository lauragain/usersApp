import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    {path: "", pathMatch: 'full', redirectTo: 'home'},
    {path: "home", component: HomeComponent},
    {path: "dashboard", component: DashboardComponent, children: [
        {path: "", pathMatch: 'full', redirectTo: 'users'},
        {path: "users", component: UserListComponent},
    ]},
    
    {path: '**', redirectTo: 'home'}
];
