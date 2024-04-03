import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { EventComponent } from './pages/event/event.component';
import { authGuard } from './guards/auth.guard';
import { AddEventComponent } from './pages/add-event/add-event.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    title: 'EventLink | Home',
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'EventLink | Login',
  },
  {
    path: 'signup',
    component: RegisterComponent,
    title: 'EventLink | Signup',
  },
  {
    path: 'event/:id',
    component: EventComponent,
    canActivate: [authGuard],
  },
  {
    path: 'addEvent',
    component: AddEventComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
