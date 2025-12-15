import { Routes } from '@angular/router';
import { Layout } from './app.component/layout/layout';
import { Home } from './app.component/pages/home/home';
import { Login } from './app.component/shared/login/login';

export const routes: Routes = [
    {
        path: '',
        component: Layout,
        children: [
            {path:'', redirectTo:'home', pathMatch:'full'},
            {path: 'home', component: Home},
            {path:'login', component: Login}, 
        ]
    }
];
