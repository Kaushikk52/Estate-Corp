import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ResidentialBuyComponent } from './components/residential-buy/residential-buy.component';
import { ResidentialRentComponent } from './components/residential-rent/residential-rent.component';
import { CommercialBuyComponent } from './components/commercial-buy/commercial-buy.component';
import { CommercialRentComponent } from './components/commercial-rent/commercial-rent.component';
import { AddpropertyComponent } from './components/addproperty/addproperty.component';
import { UserDashComponent } from './components/user-dash/user-dash.component';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { AboutComponent } from './components/about/about.component';
import { adminrouteGuard } from './routeguard/adminroute.guard';
import { userrouteGuard } from './routeguard/userroute.guard';
import { SellDashboardComponent } from './components/sell-dashboard/sell-dashboard.component';
import { PropertyDetailComponent } from './components/property-detail/property-detail.component';




const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'resident-buy', component: ResidentialBuyComponent },
  { path: 'resident-rent', component: ResidentialRentComponent },
  { path: 'commercial-buy', component: CommercialBuyComponent },
  { path: 'commercial-rent', component: CommercialRentComponent },
  { path: 'add-property', component: AddpropertyComponent , canActivate: [userrouteGuard] },
  { path: 'sell-dashboard', component: SellDashboardComponent, canActivate: [userrouteGuard] },
  { path: 'property/:propertyId', component: PropertyDetailComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'user-dashboard', component: UserDashComponent, canActivate: [adminrouteGuard]},
  { path: 'property-list', component: PropertyListComponent, canActivate: [adminrouteGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
