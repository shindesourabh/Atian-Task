import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' }, // Redirect to auth
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(authModule => authModule.AuthModule)
  },
  {
    path: 'features',
    loadChildren: () => import('./features/features.module').then(featuresModule => featuresModule.FeaturesModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
